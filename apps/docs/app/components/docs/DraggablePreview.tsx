"use client";

import React, { useState } from "react";
import Draggable from "@/registry/new-york/ui/draggable";

export function SimpleDraggableListPreview() {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
  ]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Simple Draggable List</h3>
      <Draggable
        items={items}
        onItemsChange={setItems}
        renderItem={(item) => <div>{item.name}</div>}
      />
    </div>
  );
}

export function CustomDraggableListPreview() {
  const [items, setItems] = useState([
    { id: 1, title: "Task 1", description: "Description of Task 1" },
    { id: 2, title: "Task 2", description: "Description of Task 2" },
    { id: 3, title: "Task 3", description: "Description of Task 3" },
    { id: 4, title: "Task 4", description: "Description of Task 4" },
  ]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Custom Draggable List</h3>
      <Draggable
        items={items}
        onItemsChange={setItems}
        renderItem={(item) => (
          <div>
            <h4 className="font-semibold">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        )}
      />
    </div>
  );
}
