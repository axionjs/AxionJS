"use client";

import * as React from "react";
import { Check, Copy, Link } from "lucide-react";
import { useCopyToClipboard } from "@/registry/new-york/hooks/use-copy-to-clipboard";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import { toast } from "@/registry/new-york/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";

export function CopyToClipboardPreview() {
  const { copy, isCopied } = useCopyToClipboard();
  const [text, setText] = React.useState(
    "https://example.com/very-long-url-that-should-be-copied"
  );

  const handleCopy = async () => {
    const success = await copy(text);

    if (success) {
      toast({
        description: "Copied to clipboard!",
      });
    } else {
      toast({
        variant: "destructive",
        description: "Failed to copy text.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="copy-text">Text to copy</Label>
        <div className="flex gap-2">
          <Input
            id="copy-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleCopy} size="icon" variant="outline">
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CodeBlockCopyPreview() {
  const { copy, isCopied } = useCopyToClipboard();

  const codeSnippet = `function greeting(name) {
  return \`Hello, \${name}!\`;
}

console.log(greeting('World'));`;

  const handleCopy = async () => {
    await copy(codeSnippet);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center justify-between">
          <span>Example Code</span>
          <Button
            onClick={handleCopy}
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs gap-1"
          >
            {isCopied ? (
              <>
                <Check className="h-3 w-3" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="p-2 bg-muted rounded-md overflow-x-auto text-sm">
          <code>{codeSnippet}</code>
        </pre>
      </CardContent>
    </Card>
  );
}

export function ShareLinkPreview() {
  const { copy, isCopied } = useCopyToClipboard();
  const shareUrl = "https://myawesomeapp.com/share/post-12345";

  const handleCopy = async () => {
    await copy(shareUrl);

    if (!isCopied) {
      toast({
        title: "Link copied!",
        description: "Share link has been copied to clipboard",
      });
    }
  };

  return (
    <div className="w-full max-w-sm">
      <Button
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2"
        variant="outline"
      >
        <Link className="h-4 w-4" />
        {isCopied ? "Copied!" : "Copy share link"}
      </Button>
    </div>
  );
}
