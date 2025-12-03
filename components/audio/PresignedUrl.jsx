import axios from 'axios';

export const PresignedUrl = async (fileType, fileName, mimeType, folder) => {
  try {
    const response = await axios.post("/api/generate-presigned-url", {
      fileType,
      fileName,
      mimeType,
      folder,
    });

    return response.data; 
  } catch (error) {
    console.error("Error generating S3 presigned URL:", error);
    throw error;
  }
};