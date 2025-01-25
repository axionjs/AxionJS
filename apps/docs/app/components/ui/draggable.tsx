import * as React from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { GripVertical, Move } from "lucide-react";

type SwapyItem = {
  id: UniqueIdentifier;
  content: React.ReactNode;
};

interface SwapyRootProps {
  items: SwapyItem[];
  onReorder: (items: SwapyItem[]) => void;
  className?: string;
  handleVariant?: "handle" | "ghost" | "none";
  ariaLabel?: string;
}

const SwapyRoot = ({
  items,
  onReorder,
  className,
  handleVariant = "handle",
  ariaLabel = "Sortable list",
}: SwapyRootProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      onReorder(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={items}>
        <ul
          className={cn("grid gap-2", className)}
          role="list"
          aria-label={ariaLabel}
        >
          {items.map((item) => (
            <SwapyItem key={item.id} id={item.id} handleVariant={handleVariant}>
              {item.content}
            </SwapyItem>
          ))}
        </ul>
      </SortableContext>

      {/* Screen reader announcements */}
      <div role="status" aria-live="polite" className="sr-only">
        {items.map((item) => item.id).join(", ")}
      </div>
    </DndContext>
  );
};

interface SwapyItemProps {
  id: UniqueIdentifier;
  children: React.ReactNode;
  handleVariant?: "handle" | "ghost" | "none";
}

const SwapyItem = ({ id, children, handleVariant }: SwapyItemProps) => {
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
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative rounded-lg border bg-background p-4",
        "transition-shadow duration-200 ease-in-out",
        "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
        isDragging && "opacity-50 shadow-lg"
      )}
      role="listitem"
      aria-roledescription="sortable item"
      aria-describedby={`instruction-${id}`}
    >
      {handleVariant !== "none" && (
        <SwapyHandle variant={handleVariant} {...attributes} {...listeners} />
      )}

      <div className={handleVariant !== "none" ? "ps-8" : ""}>{children}</div>

      <div id={`instruction-${id}`} className="sr-only">
        Press space bar to pick up or drop item. Use arrow keys to reorder.
      </div>
    </li>
  );
};

interface SwapyHandleProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "handle" | "ghost";
}

const SwapyHandle = ({ variant, className, ...props }: SwapyHandleProps) => {
  const Comp = variant === "ghost" ? Slot : "button";

  return (
    <Comp
      className={cn(
        "absolute left-2 top-1/2 -translate-y-1/2",
        "rounded-sm p-2 hover:bg-accent",
        "focus:outline-none focus:ring-2 focus:ring-primary",
        "cursor-move touch-none",
        variant === "ghost"
          ? "text-transparent hover:text-muted-foreground"
          : "text-muted-foreground",
        className
      )}
      aria-label="Drag handle"
      role="button"
      tabIndex={0}
      {...props}
    >
      {variant === "ghost" ? (
        <Move className="h-4 w-4" />
      ) : (
        <GripVertical className="h-4 w-4" />
      )}
    </Comp>
  );
};

// Keyboard accessible version for WCAG compliance
const SwapyKeyboardControls = ({
  onMoveUp,
  onMoveDown,
}: {
  onMoveUp: () => void;
  onMoveDown: () => void;
}) => (
  <div className="mt-2 flex gap-2">
    <button
      className={cn(
        "px-2 py-1 text-sm rounded",
        "bg-primary text-primary-foreground",
        "hover:bg-primary/90",
        "focus:ring-2 focus:ring-primary focus:ring-offset-2"
      )}
      onClick={onMoveUp}
      aria-label="Move item up"
    >
      ↑
    </button>
    <button
      className={cn(
        "px-2 py-1 text-sm rounded",
        "bg-primary text-primary-foreground",
        "hover:bg-primary/90",
        "focus:ring-2 focus:ring-primary focus:ring-offset-2"
      )}
      onClick={onMoveDown}
      aria-label="Move item down"
    >
      ↓
    </button>
  </div>
);

export { SwapyRoot, SwapyItem, SwapyHandle, SwapyKeyboardControls };
