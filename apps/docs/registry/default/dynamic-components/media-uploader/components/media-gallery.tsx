"use client";

import { useState } from "react";
import Image from "next/image";
import { Film, Trash2 } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { deleteMedia } from "@/registry/default/dynamic-components/media-uploader/actions/media-actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/default/ui/alert-dialog";

interface Media {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string | null;
  mediaType: "IMAGE" | "VIDEO";
  createdAt: Date;
}

interface MediaGalleryProps {
  media: Media[];
}

export function MediaGallery({ media: initialMedia }: MediaGalleryProps) {
  const [media, setMedia] = useState<Media[]>(initialMedia);
  const [mediaToDelete, setMediaToDelete] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!mediaToDelete) return;

    try {
      await deleteMedia(mediaToDelete);
      setMedia(media.filter((item) => item.id !== mediaToDelete));
      setMediaToDelete(null);
    } catch (error) {
      console.error("Error deleting media:", error);
    }
  };

  if (media.length === 0) {
    return (
      <div className="text-center p-10 border rounded-lg">
        <p className="text-muted-foreground">No media uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {media.map((item) => (
        <div
          key={item.id}
          className="group relative border rounded-lg overflow-hidden"
        >
          <div className="aspect-square relative bg-gray-100">
            <Image
              src={item.thumbnailUrl || item.url}
              alt={item.name}
              fill
              className="object-cover"
            />
            {item.mediaType === "VIDEO" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Film className="h-10 w-10 text-white" />
              </div>
            )}
          </div>

          <div className="p-3">
            <p className="font-medium truncate">{item.name}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-2 flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </Button>

              <AlertDialog
                open={mediaToDelete === item.id}
                onOpenChange={(open) => !open && setMediaToDelete(null)}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => setMediaToDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the media. This action cannot
                      be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
