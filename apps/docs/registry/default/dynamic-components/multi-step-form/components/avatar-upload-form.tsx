"use client";

import * as React from "react";
import type { UseFormReturn } from "react-hook-form";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/default/ui/form";
import type { OnboardingFormValues } from "@/registry/default/dynamic-components/multi-step-form/components/onboarding-wizard";

interface AvatarUploadFormProps {
  form: UseFormReturn<OnboardingFormValues>;
}

export function AvatarUploadForm({ form }: AvatarUploadFormProps) {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(
    form.getValues().avatarUrl || null,
  );

  // In a real implementation, this would upload to a storage service
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // In actual implementation, you would upload the file to a storage service
    // and then set the returned URL as the avatarUrl
    form.setValue("avatarUrl", url);
  };

  const clearAvatar = () => {
    setPreviewUrl(null);
    form.setValue("avatarUrl", "");
  };

  return (
    <FormField
      control={form.control}
      name="avatarUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Profile Picture</FormLabel>
          <FormControl>
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={previewUrl || ""} />
                <AvatarFallback className="text-lg">
                  {form.getValues().name
                    ? form.getValues().name.charAt(0).toUpperCase()
                    : "?"}
                </AvatarFallback>
              </Avatar>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("avatar-upload")?.click()
                  }
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>

                {previewUrl && (
                  <Button type="button" variant="outline" onClick={clearAvatar}>
                    <X className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                )}

                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </FormControl>
          <FormDescription className="text-center">
            Upload a profile picture. This will be displayed on your profile.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
