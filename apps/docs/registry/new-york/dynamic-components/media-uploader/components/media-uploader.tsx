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
  Trash2,
  Eye,
} from "lucide-react";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { cn } from "@/lib/utils";
import { uploadToCloudinary } from "@/registry/new-york/dynamic-components/media-uploader/actions/media-actions";
import { Progress } from "@/registry/new-york/ui/progress";
import { Badge } from "@/registry/new-york/ui/badge";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { Separator } from "@/registry/new-york/ui/separator";

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
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileWithStatus.id ? { ...f, status: "uploading" } : f,
        ),
      );

      const reader = new FileReader();
      const base64 = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(fileWithStatus.file);
      });

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

      const result = await uploadToCloudinary({
        name: fileWithStatus.file.name,
        type: fileWithStatus.file.type,
        size: fileWithStatus.file.size,
        base64: (base64 as string).split(",")[1],
        isVideo: fileWithStatus.isVideo,
      });

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

  const getStatusIcon = (status: FileStatus) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-3 w-3 text-green-600" />;
      case "error":
        return <AlertCircle className="h-3 w-3 text-destructive" />;
      case "uploading":
        return (
          <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse" />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm z-50">
      <Card className="w-full max-w-[80vw] max-h-[70vh] flex flex-col shadow-lg border">
        <CardHeader className="flex-shrink-0 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Media Upload
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {files.length} files
              </Badge>
              {files.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFiles([])}
                  className="h-7 px-2 text-xs"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col gap-4 min-h-0 p-4">
          {/* Uploaded Files Section */}
          {files.length > 0 && (
            <>
              <div className="flex-1 min-h-0">
                <ScrollArea className="h-full pr-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {files.map((fileWithStatus) => (
                      <div key={fileWithStatus.id} className="relative group">
                        <Card className="overflow-hidden border transition-all hover:shadow-md">
                          <div className="aspect-square relative bg-muted/30">
                            {fileWithStatus.status === "success" &&
                            fileWithStatus.thumbnailUrl ? (
                              <>
                                <Image
                                  src={fileWithStatus.thumbnailUrl}
                                  alt={fileWithStatus.file.name}
                                  fill
                                  className="object-cover"
                                />
                                {fileWithStatus.isVideo && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <Film className="h-4 w-4 text-white" />
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                {fileWithStatus.isVideo ? (
                                  <Film className="h-6 w-6 text-muted-foreground" />
                                ) : (
                                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                )}
                              </div>
                            )}

                            {/* Status Overlay */}
                            {fileWithStatus.status === "uploading" && (
                              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                                <div className="text-center space-y-1">
                                  <Progress
                                    value={fileWithStatus.progress}
                                    className="h-1 w-12"
                                  />
                                  <span className="text-xs text-muted-foreground">
                                    {Math.round(fileWithStatus.progress)}%
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Remove Button */}
                            <Button
                              variant="secondary"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeFile(fileWithStatus.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="p-2 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-medium truncate flex-1 mr-1">
                                {fileWithStatus.file.name}
                              </p>
                              {getStatusIcon(fileWithStatus.status)}
                            </div>

                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>
                                {(
                                  fileWithStatus.file.size /
                                  1024 /
                                  1024
                                ).toFixed(1)}
                                MB
                              </span>

                              {fileWithStatus.status === "idle" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-5 px-2 text-xs"
                                  onClick={() => handleUpload(fileWithStatus)}
                                >
                                  Upload
                                </Button>
                              )}

                              {fileWithStatus.status === "success" &&
                                fileWithStatus.url && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-5 px-2 text-xs"
                                    asChild
                                  >
                                    <a
                                      href={fileWithStatus.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <Eye className="h-3 w-3" />
                                    </a>
                                  </Button>
                                )}

                              {fileWithStatus.status === "error" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-5 px-2 text-xs text-destructive"
                                  onClick={() => handleUpload(fileWithStatus)}
                                >
                                  Retry
                                </Button>
                              )}
                            </div>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <Separator />
            </>
          )}

          {/* Upload Area */}
          <div className="flex-shrink-0">
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/30",
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              aria-label="Upload media files"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e.target.files)}
                className="sr-only"
                multiple
                accept="image/*,video/*"
              />

              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <Upload className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Drop files here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG, GIF, WebP, MP4, WebM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
