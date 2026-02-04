"use client";

import {
  formatBytes,
  useFileUpload,
  type FileWithPreview,
} from "@/hooks/use-file-upload";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ImageIcon, TriangleAlert, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface ImageUploadProps {
  value?: string | null;
  onChange?: (file: FileWithPreview | null) => void;

  maxSize?: number;

  shape?: "circle" | "square" | "rounded";
  size?: number;

  placeholderIcon?: React.ReactNode;
  label?: string;
  description?: string;

  className?: string;
}

export default function ImageUpload({
  value,
  onChange,
  maxSize = 2 * 1024 * 1024, // 2MB
  shape = "circle",
  size = 96,
  placeholderIcon,
  label = "Upload Image",
  description,
  className,
}: ImageUploadProps) {
  const [
    { files, isDragging, errors },
    {
      removeFile,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles: 1,
    maxSize,
    accept: "image/*",
    multiple: false,
  });

  useEffect(() => {
    onChange?.(files[0] || null);
  }, [files, onChange]);

  const currentFile = files[0];
  const previewUrl = currentFile?.preview || value;

  const shapeClass = {
    circle: "rounded-full",
    square: "rounded-none",
    rounded: "rounded-md",
  }[shape];

  const handleRemove = () => {
    if (currentFile) {
      removeFile(currentFile.id);
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {/* Avatar Preview */}
      <div className="relative">
        <div
          style={{ width: size, height: size }}
          className={cn(
            "group/avatar relative cursor-pointer overflow-hidden border border-dashed flex items-center justify-center transition-colors",
            shapeClass,
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/20",
            previewUrl && "border-solid",
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <input {...getInputProps()} className="sr-only" />

          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            (placeholderIcon ?? (
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            ))
          )}
        </div>

        {/* Remove Button - only show when file is uploaded */}
        {currentFile && (
          <Button
            size="icon"
            variant="outline"
            onClick={handleRemove}
            className="size-6 absolute end-0 top-0 rounded-full"
            aria-label="Remove avatar"
          >
            <X className="size-3.5" />
          </Button>
        )}
      </div>

      {/* Upload Instructions */}
      <div className="text-center space-y-0.5">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">
          {description ?? `PNG, JPG up to ${formatBytes(maxSize)}`}
        </p>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive" appearance="light" className="mt-5">
          <AlertIcon>
            <TriangleAlert />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Upload error</AlertTitle>
            <AlertDescription>
              {errors.map((error, index) => (
                <p key={index} className="last:mb-0">
                  {error}
                </p>
              ))}
            </AlertDescription>
          </AlertContent>
        </Alert>
      )}
    </div>
  );
}
