import axios from "axios";

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "nscc1iyy");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dhzyqsicp/upload",
      formData
    );
    console.log("Imagen subida:", response.data.secure_url);
    return response.data.secure_url;
  } catch (error) {
    alert("Error al cargar la imagen:", error);
    return null;
  }
};
