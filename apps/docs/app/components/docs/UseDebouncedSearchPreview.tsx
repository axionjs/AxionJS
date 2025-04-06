"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { useDebounce } from "@/registry/new-york/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function DebouncedSearchPreview() {
  const [inputValue, setInputValue] = React.useState("");
  const [results, setResults] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // Debounce the input value to avoid excessive API calls
  const debouncedValue = useDebounce(inputValue, 500);

  // Mock search function - in a real app, this would be an API call
  const searchItems = React.useCallback(async (query: string) => {
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock results based on query
    const mockData = [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "TailwindCSS",
      "Node.js",
      "Express",
      "MongoDB",
    ];

    const filtered = mockData.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
    setIsLoading(false);
  }, []);

  // Effect to trigger search when debounced value changes
  React.useEffect(() => {
    if (debouncedValue) {
      searchItems(debouncedValue);
    } else {
      setResults([]);
    }
  }, [debouncedValue, searchItems]);

  return (
    <div className="space-y-4 not-prose">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="pl-8"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <Card>
        <CardContent className="p-4 min-h-[200px]">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="p-2 rounded-md hover:bg-muted transition-colors"
                >
                  {result}
                </div>
              ))}
            </div>
          ) : debouncedValue ? (
            <p className="text-center text-muted-foreground py-4">
              No results found
            </p>
          ) : (
            <p className="text-center text-muted-foreground py-4">
              Start typing to search
            </p>
          )}
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        {debouncedValue
          ? `Showing results for "${debouncedValue}"`
          : "Enter a search term"}
      </div>
    </div>
  );
}

export function BasicDebouncePreview() {
  const [value, setValue] = React.useState("");
  const debouncedValue = useDebounce(value, 500);

  return (
    <div className="space-y-4 not-prose">
      <div className="space-y-2">
        <Input
          placeholder="Type something..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium mb-1">Raw Value:</div>
            <div className="text-lg">{value}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium mb-1">Debounced Value:</div>
            <div className="text-lg">{debouncedValue}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
