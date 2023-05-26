import Swal from "sweetalert2";
import styles from "./popup.module.css";

const Pop_up = (icon, title, text) => {
  // Corrección: "tittle" -> "title"
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 2200,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    title: title, // Corrección: "tittle" -> "title"
    text: text,
  });
};

export default Pop_up;
