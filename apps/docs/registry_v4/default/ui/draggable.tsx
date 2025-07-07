import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { GripVertical } from "lucide-react";

interface DraggableProps<T> {
  items: T[];
  onItemsChange: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  idKey?: keyof T;
  className?: string;
}

const Draggable = <T extends { id: string | number }>({
  items,
  onItemsChange,
  renderItem,
  idKey = "id",
  className,
}: DraggableProps<T>) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item[idKey] === active.id);
      const newIndex = items.findIndex((item) => item[idKey] === over?.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      onItemsChange(newItems);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item[idKey])}
        strategy={verticalListSortingStrategy}
      >
        <div className={cn("space-y-2", className)}>
          {items.map((item, index) => (
            <SortableItem
              key={item[idKey]}
              id={item[idKey]}
              item={item}
              index={index}
              renderItem={renderItem}
              idKey={idKey}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

interface SortableItemProps<T> {
  id: string | number;
  item: T;
  index: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  idKey: keyof T;
}

const SortableItem = <T extends { id: string | number }>({
  id,
  item,
  index,
  renderItem,
  idKey,
}: SortableItemProps<T>) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "p-4 bg-background border border-border rounded-md shadow-sm flex items-center justify-between",
        isDragging && "z-50",
      )}
      {...attributes}
      {...listeners}
    >
      <div className="flex-1">{renderItem(item, index)}</div>
      <Button
        variant="ghost"
        size="icon"
        aria-label={`Drag handle for item ${index + 1}`}
        className="ml-2"
        {...listeners}
      >
        <GripVertical />
      </Button>
    </div>
  );
};

export default Draggable;
