"use client";

import * as React from "react";
import { useUndoRedo } from "@/registry/new-york/hooks/use-undo-redo";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Button } from "@/registry/new-york/ui/button";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { Badge } from "@/registry/new-york/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";

export function UseUndoRedoPreview() {
  const { state, set, undo, redo, canUndo, canRedo, history } =
    useUndoRedo<string>("Hello world!");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    set(e.target.value);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Text Editor</span>
          <Badge variant="outline">
            {canUndo ? history.past.length : 0} changes
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={state}
          onChange={handleTextChange}
          placeholder="Type something..."
          className="min-h-[120px]"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={undo}
            disabled={!canUndo}
          >
            <UndoIcon className="h-4 w-4" />
            <span className="sr-only">Undo</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={redo}
            disabled={!canRedo}
          >
            <RedoIcon className="h-4 w-4" />
            <span className="sr-only">Redo</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export function ColorUndoRedoPreview() {
  const { state, set, undo, redo, canUndo, canRedo, history } =
    useUndoRedo<string>("#6366f1");

  const colors = [
    { name: "Red", value: "#ef4444" },
    { name: "Green", value: "#22c55e" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Purple", value: "#a855f7" },
    { name: "Pink", value: "#ec4899" },
    { name: "Orange", value: "#f97316" },
    { name: "Yellow", value: "#eab308" },
    { name: "Indigo", value: "#6366f1" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Picker with History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div
            className="h-24 w-full rounded-md transition-colors duration-200"
            style={{ backgroundColor: state }}
          />

          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <button
                key={color.value}
                className="h-8 w-full rounded-md border transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring"
                style={{ backgroundColor: color.value }}
                onClick={() => set(color.value)}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={undo}
            disabled={!canUndo}
            size="sm"
          >
            <UndoIcon className="mr-2 h-4 w-4" />
            Undo
          </Button>
          <Button
            variant="outline"
            onClick={redo}
            disabled={!canRedo}
            size="sm"
          >
            <RedoIcon className="mr-2 h-4 w-4" />
            Redo
          </Button>
        </div>
        <Badge variant="outline">
          {history.past.length > 0
            ? `${history.past.length} changes`
            : "No changes"}
        </Badge>
      </CardFooter>
    </Card>
  );
}

export function AdvancedUndoRedoPreview() {
  type Task = {
    id: string;
    text: string;
    completed: boolean;
  };

  const initialTasks: Task[] = [
    { id: "1", text: "Learn React", completed: true },
    { id: "2", text: "Build a project", completed: false },
    { id: "3", text: "Deploy to production", completed: false },
  ];

  const { state, set, undo, redo, canUndo, canRedo } =
    useUndoRedo<Task[]>(initialTasks);
  const [selectedTab, setSelectedTab] = React.useState<string>("current");

  const addTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      text: "New task",
      completed: false,
    };
    set([...state, newTask]);
  };

  const toggleTask = (id: string) => {
    set(
      state.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: string) => {
    set(state.filter((task) => task.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Task Manager</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={undo}
              disabled={!canUndo}
            >
              <UndoIcon className="mr-2 h-4 w-4" />
              Undo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={redo}
              disabled={!canRedo}
            >
              <RedoIcon className="mr-2 h-4 w-4" />
              Redo
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="current">Current State</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="current">
            <div className="space-y-2">
              {state.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-2 border rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <span
                      className={`text-sm ${
                        task.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTask(task.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button onClick={addTask} className="w-full" size="sm">
                Add Task
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="history">
            <div className="space-y-4">
              <div className="border rounded-md p-2">
                <div className="font-medium">Future</div>
                {canRedo ? (
                  <div className="p-2 max-h-24 overflow-y-auto">
                    {JSON.stringify(redo, null, 2)}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-sm p-2">
                    No future states
                  </div>
                )}
              </div>
              <div className="border rounded-md p-2">
                <div className="font-medium">Present</div>
                <div className="text-sm max-h-24 overflow-y-auto">
                  {JSON.stringify(state, null, 2)}
                </div>
              </div>
              <div className="border rounded-md p-2">
                <div className="font-medium">
                  Past ({canUndo ? "Click Undo to revert" : "Empty"})
                </div>
                {canUndo ? (
                  <div className="text-sm max-h-24 overflow-y-auto">
                    {JSON.stringify(undo, null, 2)}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-sm p-2">
                    No past states
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Icons

function UndoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 14 4 9l5-5" />
      <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
    </svg>
  );
}

function RedoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m15 14 5-5-5-5" />
      <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13" />
    </svg>
  );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
