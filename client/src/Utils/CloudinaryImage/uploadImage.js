import axios from "axios";

export const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");
  
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzv1xau8l/upload",
        formData
      );
      console.log("Imagen subida:", response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      alert("Error al cargar la imagen:", error);
      return null;
    }
  };
