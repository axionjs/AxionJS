"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/app/components/ui/alert-dialog";

export default function AlertDialogPreview() {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Example 1: Default Alert Dialog */}
      <div>
        <h3 className="text-lg font-medium font-center">
          Default Alert Dialog
        </h3>
        <AlertDialog>
          <AlertDialogTrigger className="px-4 py-2 text-white bg-primary w-full rounded-md">
            Open Dialog
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Action</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to perform this action? This action is
                irreversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Example 2: Destructive Alert Dialog */}
      <div>
        <h3 className="text-lg font-medium">Destructive Alert Dialog</h3>
        <AlertDialog>
          <AlertDialogTrigger className="px-4 py-2 text-white bg-destructive  w-full rounded-md">
            Delete Item
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
              <AlertDialogDescription>
                Deleting this item will permanently remove it. Are you sure you
                want to proceed?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 text-white">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
