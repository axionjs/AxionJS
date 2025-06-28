"use server";

import { db } from "@/registry/default/lib/db";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary({
  name,
  type,
  size,
  base64,
  isVideo,
}: {
  name: string;
  type: string;
  size: number;
  base64: string;
  isVideo: boolean;
}) {
  try {
    // Create a unique public_id
    const timestamp = new Date().getTime();
    const publicId = `upload_${timestamp}_${name.replace(/\.[^/.]+$/, "")}`;

    let uploadResult;

    if (isVideo) {
      // For videos - note: Cloudinary might have size limits for direct uploads
      uploadResult = await cloudinary.uploader.upload(
        `data:${type};base64,${base64}`,
        {
          resource_type: "video",
          public_id: publicId,
          folder: "videos",
        }
      );
    } else {
      // For images
      uploadResult = await cloudinary.uploader.upload(
        `data:${type};base64,${base64}`,
        {
          public_id: publicId,
          folder: "images",
        }
      );
    }

    // Create a record in the database
    const mediaRecord = await db.media.create({
      data: {
        name,
        size,
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        thumbnailUrl: isVideo ? null : uploadResult.secure_url,
        mediaType: isVideo ? "VIDEO" : "IMAGE",
      },
    });

    revalidatePath("/media");

    return {
      success: true,
      mediaId: mediaRecord.id,
      url: uploadResult.secure_url,
      thumbnailUrl: isVideo ? null : uploadResult.secure_url,
    };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload media");
  }
}

export async function getMedia() {
  try {
    const media = await db.media.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return media;
  } catch (error) {
    console.error("Error fetching media:", error);
    throw new Error("Failed to fetch media");
  }
}

export async function deleteMedia(id: string) {
  try {
    // Get the media record
    const media = await db.media.findUnique({
      where: { id },
    });

    if (!media) {
      throw new Error("Media not found");
    }

    // Delete from Cloudinary
    if (media.publicId) {
      await cloudinary.uploader.destroy(media.publicId, {
        resource_type: media.mediaType === "VIDEO" ? "video" : "image",
      });
    }

    // Delete from database
    await db.media.delete({
      where: { id },
    });

    // Revalidate paths
    revalidatePath("/media");

    return { success: true };
  } catch (error) {
    console.error("Error deleting media:", error);
    throw new Error("Failed to delete media");
  }
}
