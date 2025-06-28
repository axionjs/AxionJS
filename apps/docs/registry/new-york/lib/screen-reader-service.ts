"use client";

class ScreenReaderService {
  private speechSynthesis: SpeechSynthesis | null = null;
  private utterance: SpeechSynthesisUtterance | null = null;
  private isReading: boolean = false;
  private isMounted: boolean = false;
  private currentElement: HTMLElement | null = null;
  private lastElementSelector: string = "";
  private highlightClass = "screen-reader-highlight";

  constructor() {
    this.isMounted = typeof window !== "undefined";

    if (this.isMounted) {
      try {
        this.speechSynthesis = window.speechSynthesis;
        this.utterance = new SpeechSynthesisUtterance();

        if (this.speechSynthesis) {
          this.speechSynthesis.cancel();
        }
      } catch (error) {
        console.error("Error initializing speech synthesis:", error);
        this.isMounted = false;
      }
    }
  }

  public cleanup() {
    if (!this.isMounted) return;

    document.removeEventListener("mouseover", this.handleHover);
    document.removeEventListener("focusin", this.handleFocus);
    this.stop();
  }

  // Store bound handlers to ensure proper removal
  private handleHover = this.createHandleEvent("mouseover");
  private handleFocus = this.createHandleEvent("focusin");

  public initialize(
    enabled: boolean,
    speed: "normal" | "slow",
    volume: number
  ) {
    if (!this.isMounted) return;

    // Set speech properties
    this.utterance!.rate = speed === "slow" ? 0.8 : 1.0;
    this.utterance!.volume = volume;

    if (enabled) {
      document.addEventListener("mouseover", this.handleHover);
      document.addEventListener("focusin", this.handleFocus);
    } else {
      document.removeEventListener("mouseover", this.handleHover);
      document.removeEventListener("focusin", this.handleFocus);
      this.stop(); // Stop reading if disabled
    }
  }

  private createHandleEvent(eventType: "mouseover" | "focusin") {
    return (event: Event) => {
      const target = event.target as HTMLElement;

      // Avoid re-reading the same element if already highlighted and reading
      if (
        this.currentElement === target ||
        !this.isSignificantElement(target)
      ) {
        return;
      }

      const selector = this.getElementSelector(target);

      // Prevent reading the same element repeatedly, or if it's the accessibility trigger itself
      if (
        selector === this.lastElementSelector ||
        target.closest(".accessibility-trigger") ||
        target.closest(".accessibility-panel-container")
      ) {
        return;
      }

      this.stop(); // Stop current speech before starting new one
      this.removeHighlight();

      this.currentElement = target;
      this.lastElementSelector = selector;

      const text = this.getTextForElement(target);
      if (text) {
        this.speak(text);
        this.addHighlight(target);
      }
    };
  }

  private speak(text: string) {
    if (!this.speechSynthesis || !this.utterance) return;

    this.utterance.text = text;
    this.speechSynthesis.speak(this.utterance);
    this.isReading = true;

    this.utterance.onend = () => {
      this.isReading = false;
      this.removeHighlight();
      this.currentElement = null;
      this.lastElementSelector = ""; // Reset after speech ends
    };

    this.utterance.onerror = (event) => {
      console.error("SpeechSynthesisUtterance.onerror", event);
      this.isReading = false;
      this.removeHighlight();
      this.currentElement = null;
      this.lastElementSelector = "";
    };
  }

  public stop() {
    if (this.speechSynthesis && this.isReading) {
      this.speechSynthesis.cancel();
      this.isReading = false;
    }
    this.removeHighlight();
    this.currentElement = null;
    this.lastElementSelector = "";
  }

  private addHighlight(element: HTMLElement) {
    element.classList.add(this.highlightClass);
  }

  private removeHighlight() {
    document
      .querySelectorAll(`.${this.highlightClass}`)
      .forEach((el) => el.classList.remove(this.highlightClass));
  }

  private getTextForElement(element: HTMLElement): string {
    // Check for explicit accessibility labels first
    if (element.getAttribute("aria-label")) {
      return element.getAttribute("aria-label")!;
    }
    if (element.getAttribute("title")) {
      return element.getAttribute("title")!;
    }

    // Get text based on element type and role
    if (element.tagName === "IMG") {
      return element.alt || "Image";
    }

    if (element.tagName === "A") {
      return `Link: ${element.textContent || ""}`;
    }

    if (element.tagName === "BUTTON") {
      return `Button: ${element.textContent || ""}`;
    }

    if (element.tagName === "INPUT") {
      const inputEl = element as HTMLInputElement;
      const type = inputEl.type;
      const label =
        inputEl.placeholder || inputEl.name || inputEl.id || "Input field";
      if (type === "text") return `Text input: ${label}`;
      if (type === "email") return `Email input: ${label}`;
      if (type === "password") return `Password input: ${label}`;
      if (type === "checkbox")
        return `Checkbox: ${label} ${inputEl.checked ? "checked" : "unchecked"}`;
      if (type === "radio")
        return `Radio button: ${label} ${inputEl.checked ? "selected" : ""}`;
      if (type === "submit") return `Submit button: ${inputEl.value || label}`;
      return `${label}`;
    }

    if (element.tagName === "SELECT") {
      const selectEl = element as HTMLSelectElement;
      const label = selectEl.name || selectEl.id || "Select field";
      const selectedOption = selectEl.options[selectEl.selectedIndex];
      return `Dropdown: ${label}, current value ${selectedOption ? selectedOption.textContent : ""}`;
    }

    if (element.tagName === "TEXTAREA") {
      const textareaEl = element as HTMLTextAreaElement;
      const label = textareaEl.name || textareaEl.id || "Text area";
      return `Text area: ${label}`;
    }

    if (element.hasAttribute("role")) {
      const role = element.getAttribute("role");
      const textContent = element.textContent || "";
      switch (role) {
        case "button":
          return `Button: ${textContent}`;
        case "link":
          return `Link: ${textContent}`;
        case "heading":
          return `Heading: ${textContent}`;
        case "listitem":
          return `List item: ${textContent}`;
        case "checkbox":
          return `Checkbox: ${textContent} ${element.getAttribute("aria-checked") === "true" ? "checked" : "unchecked"}`;
        case "radio":
          return `Radio button: ${textContent} ${element.getAttribute("aria-checked") === "true" ? "selected" : ""}`;
        case "textbox":
          return `Text box: ${textContent}`;
        case "combobox":
          return `Combobox: ${textContent}`;
        case "dialog":
          return `Dialog: ${textContent}`;
        case "alert":
          return `Alert: ${textContent}`;
        case "status":
          return `Status: ${textContent}`;
        default:
          return `${role}: ${textContent}`;
      }
    }

    // Default to regular text content
    return element.textContent || "";
  }

  private isSignificantElement(element: HTMLElement): boolean {
    const significantTags = [
      "A",
      "BUTTON",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "P",
      "LI",
      "IMG",
      "INPUT", // Added for inputs
      "SELECT", // Added for selects
      "TEXTAREA", // Added for textareas
      "LABEL", // Labels for form elements
      "SUMMARY", // For details/summary elements
      "ARTICLE", // Article content
      "SECTION", // Section content
      "ASIDE", // Aside content
      "MAIN", // Main content
      "NAV", // Navigation elements
      "FOOTER", // Footer content
      "HEADER", // Header content
    ];
    return (
      significantTags.includes(element.tagName) ||
      element.hasAttribute("role") ||
      element.hasAttribute("aria-label") ||
      element.hasAttribute("title")
    );
  }

  private getElementSelector(element: HTMLElement): string {
    // Create a simple selector path for the element
    const id = element.id ? `#${element.id}` : "";
    const classes = Array.from(element.classList)
      .map((cls) => `.${cls}`)
      .join("");
    return `${element.tagName}${id}${classes}`;
  }
}

// Export a singleton instance
const screenReaderService = new ScreenReaderService();
export default screenReaderService;
