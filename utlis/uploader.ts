import axios from "axios";

export const uploadBlobToCloudinary = async (blob: Blob, mediaType: string): Promise<string | null> => {
  const presetKey = process.env.NEXT_PUBLIC_PRESET_KEY;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;

  if (!presetKey || !cloudName) {
    console.error("Missing Cloudinary configuration.");
    // toast.error("Missing Cloudinary configuration.");
    return null;
  }

  if (!blob || blob.size === 0) {
    console.error("No valid file to upload.");
    // toast.error("Recording is empty or invalid.");
    return null;
  }

  // Validate mediaType
  if (!["image", "video"].includes(mediaType)) {
    console.error(`Invalid media type: ${mediaType}. Must be 'image' or 'video'.`);
    // toast.error("Invalid media type.");
    return null;
  }

  const formData = new FormData();
  formData.append("file", blob);
  formData.append("upload_preset", presetKey);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/${mediaType}/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (error: any) {
    console.error("Error uploading to Cloudinary:", error.response?.data || error);
    // toast.error(error.response?.data?.error?.message || "Error uploading file.");
    return null;
  }
};