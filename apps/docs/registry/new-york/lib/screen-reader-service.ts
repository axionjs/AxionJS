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

    // Only initialize these in the browser environment
    if (this.isMounted) {
      try {
        this.speechSynthesis = window.speechSynthesis;
        this.utterance = new SpeechSynthesisUtterance();

        // Cancel any existing speech synthesis that might be running
        if (this.speechSynthesis) {
          this.speechSynthesis.cancel();
        }
      } catch (error) {
        console.error("Error initializing speech synthesis:", error);
        this.isMounted = false;
      }
    }
  }

  // Implementation was moved to the updated initialize method above

  public cleanup() {
    if (!this.isMounted) return;

    // Important: Use the same function reference for addEventListener and removeEventListener
    // This ensures event listeners are properly removed
    document.removeEventListener("mouseover", this.handleHover);
    document.removeEventListener("focusin", this.handleFocus);
    this.stop();
  }

  // Store bound methods to ensure same reference is used for add/remove event listener
  private handleHover = this.handleHoverImpl.bind(this);
  private handleFocus = this.handleFocusImpl.bind(this);

  public initialize() {
    if (!this.isMounted) return;

    // Setup event listeners with the bound methods
    document.addEventListener("mouseover", this.handleHover);
    document.addEventListener("focusin", this.handleFocus);
  }

  public setSpeed(speed: "normal" | "slow") {
    if (!this.utterance) return;

    // Normal is around 1, slow is around 0.7
    this.utterance.rate = speed === "normal" ? 1 : 0.7;
  }

  public setVolume(volume: number) {
    if (!this.utterance) return;

    // Volume between 0 and 1
    this.utterance.volume = Math.max(0, Math.min(1, volume));
  }

  public async readElement(element: HTMLElement) {
    if (!this.speechSynthesis || !this.utterance || !element) return;

    // Stop any ongoing reading
    this.stop();

    // Get the text content of the element
    const textToRead = this.getReadableText(element);
    if (!textToRead) return;

    // Highlight the element
    this.highlightElement(element);

    // Set the text to be read
    this.utterance.text = textToRead;

    // Start reading
    this.isReading = true;
    this.currentElement = element;
    this.speechSynthesis.speak(this.utterance);

    // Add event listener to remove highlight when done
    this.utterance.onend = () => {
      this.isReading = false;
      this.removeHighlight();
      this.currentElement = null;
    };
  }

  public readPage() {
    const mainContent = document.querySelector("main") || document.body;
    this.readElement(mainContent as HTMLElement);
  }

  public stop() {
    if (!this.speechSynthesis) return;

    this.speechSynthesis.cancel();
    this.isReading = false;
    this.removeHighlight();
    this.currentElement = null;
  }

  public pause() {
    if (!this.speechSynthesis || !this.isReading) return;

    this.speechSynthesis.pause();
  }

  public resume() {
    if (!this.speechSynthesis || !this.isReading) return;

    this.speechSynthesis.resume();
  }

  private handleHoverImpl(event: MouseEvent) {
    if (!this.isReading && event.target instanceof HTMLElement) {
      // Don't read trivial elements like spans inside buttons, etc.
      if (this.isSignificantElement(event.target)) {
        this.lastElementSelector = this.getElementSelector(event.target);
      }
    }
  }

  private handleFocusImpl(event: FocusEvent) {
    if (!this.isReading && event.target instanceof HTMLElement) {
      this.readElement(event.target);
    }
  }

  private highlightElement(element: HTMLElement) {
    this.removeHighlight();
    element.classList.add(this.highlightClass);
  }

  private removeHighlight() {
    const highlighted = document.querySelectorAll(`.${this.highlightClass}`);
    highlighted.forEach((el) => el.classList.remove(this.highlightClass));
  }

  private getReadableText(element: HTMLElement): string {
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
      return `${inputEl.placeholder || inputEl.name || "Input field"}`;
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
    ];
    return (
      significantTags.includes(element.tagName) ||
      element.hasAttribute("role") ||
      element.hasAttribute("aria-label")
    );
  }

  private getElementSelector(element: HTMLElement): string {
    // Create a simple selector path for the element
    const id = element.id ? `#${element.id}` : "";
    if (id) return id;

    const classes = Array.from(element.classList)
      .map((c) => `.${c}`)
      .join("");
    return `${element.tagName.toLowerCase()}${classes}`;
  }
}

// Singleton instance
export const screenReaderService = new ScreenReaderService();

export default screenReaderService;
