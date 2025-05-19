"use client";

import type React from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  ImageIcon,
  Film,
} from "lucide-react";
import { Button } from "@/registry/new-york/ui/button";
import { Card, CardContent } from "@/registry/new-york/ui/card";
import { cn } from "@/lib/utils";
import { uploadToCloudinary } from "@/registry/new-york/dynamic-components/media-uploader/actions/media-actions";
import { Progress } from "@/registry/new-york/ui/progress";

type FileStatus = "idle" | "uploading" | "success" | "error";

interface FileWithStatus {
  file: File;
  id: string;
  progress: number;
  status: FileStatus;
  url?: string;
  thumbnailUrl?: string;
  isVideo: boolean;
}

export function MediaUploader() {
  const [files, setFiles] = useState<FileWithStatus[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles)
      .filter((file) => {
        // Filter for image and video file types
        const fileType = file.type;
        return fileType.includes("image") || fileType.includes("video");
      })
      .map((file) => ({
        file,
        id: crypto.randomUUID(),
        progress: 0,
        status: "idle" as FileStatus,
        isVideo: file.type.includes("video"),
      }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleUpload = async (fileWithStatus: FileWithStatus) => {
    try {
      // Update status to uploading
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileWithStatus.id ? { ...f, status: "uploading" } : f,
        ),
      );

      // Convert file to base64 for Server Action
      const reader = new FileReader();
      const base64 = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(fileWithStatus.file);
      });

      // Simulate progress updates
      const steps = 10;
      for (let i = 1; i <= steps; i++) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileWithStatus.id
              ? { ...f, progress: (i / steps) * 100 }
              : f,
          ),
        );
      }

      // Call server action with base64 data
      const result = await uploadToCloudinary({
        name: fileWithStatus.file.name,
        type: fileWithStatus.file.type,
        size: fileWithStatus.file.size,
        base64: (base64 as string).split(",")[1],
        isVideo: fileWithStatus.isVideo,
      });

      // Update status based on result
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileWithStatus.id
            ? {
                ...f,
                status: "success",
                progress: 100,
                url: result.url,
                thumbnailUrl: result.thumbnailUrl || result.url,
              }
            : f,
        ),
      );

      router.refresh();
    } catch (error) {
      console.error("Upload failed:", error);
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileWithStatus.id ? { ...f, status: "error" } : f,
        ),
      );
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Media Upload</h3>
          <p className="text-sm text-muted-foreground">
            Supported formats: JPG, PNG, GIF, WebP, MP4, WebM
          </p>
        </div>

        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-primary",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileChange(e.target.files)}
            className="hidden"
            multiple
            accept="image/*,video/*"
          />
          <div className="flex flex-col items-center justify-center space-y-2">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-semibold">
              Drag and drop your media here
            </h3>
            <p className="text-sm text-muted-foreground">
              or click to browse your computer
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Media ({files.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {files.map((fileWithStatus) => (
                <div
                  key={fileWithStatus.id}
                  className="relative border rounded-lg overflow-hidden"
                >
                  <div className="aspect-square relative bg-gray-100">
                    {fileWithStatus.status === "success" &&
                    fileWithStatus.thumbnailUrl ? (
                      <>
                        <Image
                          src={
                            fileWithStatus.thumbnailUrl || "/placeholder.svg"
                          }
                          alt={fileWithStatus.file.name}
                          fill
                          className="object-cover"
                        />
                        {fileWithStatus.isVideo && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Film className="h-10 w-10 text-white" />
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        {fileWithStatus.isVideo ? (
                          <Film className="h-16 w-16 text-gray-400" />
                        ) : (
                          <ImageIcon className="h-16 w-16 text-gray-400" />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <p className="font-medium truncate">
                      {fileWithStatus.file.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {(fileWithStatus.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                    <div className="mt-2">
                      {fileWithStatus.status === "idle" && (
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => handleUpload(fileWithStatus)}
                        >
                          Upload
                        </Button>
                      )}

                      {fileWithStatus.status === "uploading" && (
                        <div className="w-full">
                          <Progress
                            value={fileWithStatus.progress}
                            className="h-2"
                          />
                          <p className="text-xs text-right mt-1">
                            {Math.round(fileWithStatus.progress)}%
                          </p>
                        </div>
                      )}

                      {fileWithStatus.status === "success" && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-xs text-green-500">
                              Uploaded
                            </span>
                          </div>
                          {fileWithStatus.url && (
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="ml-2"
                            >
                              <a
                                href={fileWithStatus.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View
                              </a>
                            </Button>
                          )}
                        </div>
                      )}

                      {fileWithStatus.status === "error" && (
                        <div className="flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="text-xs text-red-500">Failed</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70 rounded-full p-1 h-7 w-7"
                    onClick={() => removeFile(fileWithStatus.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
