"use client";

import React, { useState } from "react";
import {
  SwapyRoot,
  SwapyItem,
  SwapyKeyboardControls,
} from "@/app/components/ui/draggable";

const initialItems = [
  { id: "1", content: "Item 1" },
  { id: "2", content: "Item 2" },
  { id: "3", content: "Item 3" },
  { id: "4", content: "Item 4" },
  { id: "5", content: "Item 5" },
];

export function DefaultSwapyPreview() {
  const [items, setItems] = useState(initialItems);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Default Drag-and-Drop</h3>
      <SwapyRoot items={items} onReorder={setItems} />
    </div>
  );
}

export function HandleSwapyPreview() {
  const [items, setItems] = useState(initialItems);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Drag-and-Drop with Handle</h3>
      <SwapyRoot
        items={items}
        onReorder={setItems}
        handleVariant="handle"
        ariaLabel="Handle drag-and-drop sortable list"
      />
    </div>
  );
}

export function GhostHandleSwapyPreview() {
  const [items, setItems] = useState(initialItems);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Ghost Handle Drag-and-Drop</h3>
      <SwapyRoot
        items={items}
        onReorder={setItems}
        handleVariant="ghost"
        ariaLabel="Ghost handle drag-and-drop sortable list"
      />
    </div>
  );
}

export function KeyboardSwapyPreview() {
  const [items, setItems] = useState(initialItems);

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (toIndex >= 0 && toIndex < items.length) {
      const updatedItems = [...items];
      const [removed] = updatedItems.splice(fromIndex, 1);
      updatedItems.splice(toIndex, 0, removed);
      setItems(updatedItems);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Keyboard Drag-and-Drop</h3>
      {items.map((item, index) => (
        <div
          key={item.id}
          className="rounded-lg border bg-background p-4"
          role="listitem"
          aria-label={`Sortable item ${item.content}`}
        >
          {item.content}
          <SwapyKeyboardControls
            onMoveUp={() => moveItem(index, index - 1)}
            onMoveDown={() => moveItem(index, index + 1)}
          />
        </div>
      ))}
    </div>
  );
}

export function NoHandleSwapyPreview() {
  const [items, setItems] = useState(initialItems);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Drag-and-Drop without Handle</h3>
      <SwapyRoot
        items={items}
        onReorder={setItems}
        handleVariant="none"
        ariaLabel="Sortable list without drag handle"
      />
    </div>
  );
}
