"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/registry/new-york/ui/dialog";

export default function DialogPreview() {
  return (
    <div className="space-y-6 max-w-md mx-auto not-prose">
      {/* Example 1: Basic Dialog */}
      <div>
        <h3 className="text-lg font-medium">Basic Dialog</h3>
        <Dialog>
          <DialogTrigger className="px-4 py-2 text-white bg-primary w-full rounded-md">
            Open Dialog
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Basic Dialog</DialogTitle>
              <DialogDescription>
                This is a basic dialog with a title, description, and footer
                actions.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose className="px-4 py-2 text-white bg-primary  rounded-md">
                Close
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Example 2: Dialog with Custom Actions */}
      <div>
        <h3 className="text-lg font-medium">Dialog with Custom Actions</h3>
        <Dialog>
          <DialogTrigger className="px-4 py-2 text-white bg-green-600 rounded-md w-full">
            Confirm Action
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this item? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose className="px-4 py-2 text-white bg-gray-600 rounded-md">
                Cancel
              </DialogClose>
              <button className="px-4 py-2 text-white bg-red-600 rounded-md">
                Delete
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
