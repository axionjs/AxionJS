"use client";

import { useEffect, useState } from "react";

// Component for code display with syntax highlighting using Prism
export function SyntaxHighlighter({ code, language = "typescript" }) {
  const [highlightedCode, setHighlightedCode] = useState(code);
  const [isPrismLoaded, setIsPrismLoaded] = useState(false);

  useEffect(() => {
    // Load Prism from CDN
    const prismScript = document.createElement("script");
    prismScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js";
    prismScript.async = true;

    const prismCss = document.createElement("link");
    prismCss.rel = "stylesheet";
    prismCss.href =
      "https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism-tomorrow.min.css";

    // Load the necessary language component
    const prismLang = document.createElement("script");
    prismLang.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/components/prism-${language}.min.js`;
    prismLang.async = true;

    // Add these elements to the document
    document.head.appendChild(prismCss);
    document.body.appendChild(prismScript);
    document.body.appendChild(prismLang);

    prismScript.onload = () => {
      setIsPrismLoaded(true);
    };

    return () => {
      // Clean up
      document.head.removeChild(prismCss);
      document.body.removeChild(prismScript);
      document.body.removeChild(prismLang);
    };
  }, [language]);

  useEffect(() => {
    if (isPrismLoaded && window.Prism) {
      try {
        const highlighted = window.Prism.highlight(
          code,
          window.Prism.languages[language],
          language
        );
        setHighlightedCode(highlighted);
      } catch (error) {
        console.error("Error highlighting code:", error);
      }
    }
  }, [code, language, isPrismLoaded]);

  return (
    <pre className="max-h-96 overflow-y-auto rounded-md bg-[#0F111A] p-4 text-sm">
      <code
        className={`language-${language}`}
        dangerouslySetInnerHTML={{
          __html: isPrismLoaded ? highlightedCode : code,
        }}
      />
    </pre>
  );
}

// Component for the installation command with copy functionality
export function InstallCommand({ command }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-4 flex items-center justify-between rounded-md bg-[#0F111A] p-2 text-sm text-white">
      <code className="flex-1 overflow-x-auto whitespace-pre">{command}</code>
      <button
        onClick={copyToClipboard}
        className="ml-2 rounded-md bg-slate-700 px-3 py-1 text-xs text-white hover:bg-slate-600"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

// TypeScript to JavaScript converter
export function convertTsToJs(tsCode) {
  // Basic TypeScript to JavaScript conversion
  return (
    tsCode
      // Remove type annotations
      .replace(/:\s*[A-Za-z<>[\]|&]+/g, "")
      // Remove interface definitions
      .replace(/interface\s+[^{]+\{[^}]*\}/g, "")
      // Remove type keywords
      .replace(/\btype\b\s+[^=]+=\s*[^;]+;/g, "")
      // Remove "satisfies" expressions
      .replace(/satisfies\s+[A-Za-z<>[\]|&]+/g, "")
      // Remove generic type parameters
      .replace(/<[A-Za-z,\s]+>/g, "")
      // Remove type assertions
      .replace(/as\s+[A-Za-z<>[\]|&]+/g, "")
  );
}
