"use client";
import { useEffect, useTransition, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/registry/new-york/auth/schemas";
import {
  settings,
  updateUserImage,
} from "@/registry/new-york/auth/actions/auth-actions";
import { Button } from "@/registry/new-york/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/registry/new-york/ui/form";
import { FormSuccess } from "@/registry/new-york/auth/components/form-success";
import { FormError } from "@/registry/new-york/auth/components/form-error";
import { Input } from "@/registry/new-york/ui/input";
import { Switch } from "@/registry/new-york/ui/switch";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar";
import { User } from "lucide-react";

export const SettingsForm = () => {
  const user = useSession().data?.user;

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user?.name || "",
        email: user?.email || "",
        isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
      });
      // Set the initial image preview if user has an image
      setPreviewUrl(user.image || null);
    }
  }, [user, form]);

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setError("");
    setSuccess("");

    const userId = user?.id;

    if (!userId) {
      setError("User ID is required!");
      return;
    }

    startTransition(() => {
      settings(userId, values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
          if (data?.success) {
            // Update the session to reflect changes
            update();
          }
        })
        .catch((error) => {
          console.error("Settings update error:", error);
          setError("Something went wrong!");
        });
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      // 5MB limit
      setError("Image must be less than 5MB");
      return;
    }

    setError(undefined);

    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleImageUpload = async () => {
    if (!previewUrl || !user?.id) {
      setError("Please select an image file");
      return;
    }

    setIsImageUploading(true);
    setError(undefined);
    setSuccess(undefined);

    try {
      // Send the base64 string directly to our server action
      const response = await updateUserImage(user.id, previewUrl);

      if (response.error) {
        setError(response.error);
      } else if (response.success) {
        setSuccess(response.success);
        // Update the session to reflect changes
        update();
        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (err) {
      setError("An error occurred while uploading the image");
      console.error(err);
    } finally {
      setIsImageUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {/* Profile Image */}
          <div className="space-y-4">
            <FormLabel>Profile Picture</FormLabel>
            <div className="flex flex-col items-center space-y-4">
              {previewUrl && (
                <Avatar>
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback className="bg-sky-500">
                    <User className="text-white" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div className="flex flex-col w-full space-y-2">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isImageUploading}
                  className="w-full"
                />

                <Button
                  type="button"
                  onClick={handleImageUpload}
                  disabled={!previewUrl || isImageUploading}
                  variant="outline"
                  className="w-full"
                >
                  {isImageUploading ? "Uploading..." : "Upload Image"}
                </Button>
              </div>
            </div>
          </div>

          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    disabled={isPending}
                    type="text"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field (Only for non-OAuth users) */}
          {!user?.isOAuth && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe@mail.com"
                      disabled={isPending}
                      type="email"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Two-Factor Authentication (Only for non-OAuth users) */}
          {!user?.isOAuth && (
            <FormField
              control={form.control}
              name="isTwoFactorEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Two-Factor Authentication</FormLabel>
                    <FormDescription>
                      Enable two-factor authentication for your account.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      disabled={isPending}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Error and Success Messages */}
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}

        {/* Save Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary hover:bg-primary-dark"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
};
