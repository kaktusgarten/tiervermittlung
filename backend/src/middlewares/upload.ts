import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "file_upload",
    resource_type: "auto",
    allowedFormats: ["jpg", "jpeg", "png", "gif", "pdf"],
    public_id: () => `tiervermittlung-${Date.now().toString()}`,
    limits: {
      fileSize: 8 * 1024 * 1024, // 8MB
    },
  },
} as any);

export const upload = multer({ storage });

export async function deleteFromCloudinary(imageUrl: string): Promise<void> {
  try {
    // Extract public_id from Cloudinary URL
    // URL format: https://res.cloudinary.com/[cloud_name]/image/upload/[version]/[public_id].[format]
    const parts = imageUrl.split("/");
    const fileWithExtension = parts[parts.length - 1];

    if (!fileWithExtension) {
      console.error("Invalid Cloudinary URL:", imageUrl);
      return;
    }
    const publicId = fileWithExtension.split(".")[0];

    // Extract public_id from Cloudinary URL
    // If images are in a folder, include the folder path
    const folderIndex = parts.indexOf("upload");
    if (folderIndex !== -1 && folderIndex + 2 < parts.length) {
      const folder = parts[folderIndex + 2];
      if (folder) {
        const fullPublicId = `${folder}/${publicId}`;
        await cloudinary.uploader.destroy(fullPublicId);
        console.log(`Deleted image from Cloudinary: ${fullPublicId}`);
      }
    } else {
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted image from Cloudinary: ${publicId}`);
      }
    }
  } catch (error) {
    console.error("Failed to delete from Cloudinary:", error);
    // Don't throw - we still want to delete the post even if Cloudinary fails
  }
}

export async function deleteMultipleFromCloudinary(
  imageUrls: string[]
): Promise<void> {
  await Promise.all(imageUrls.map((url) => deleteFromCloudinary(url)));
}
export default upload;
