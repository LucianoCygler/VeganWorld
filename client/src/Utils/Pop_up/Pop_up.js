import Swal from "sweetalert2";
import styles from "./popup.module.css";
/**
 * 
 * @param {*} icon success | error | info
 * @param {*} title title alert
 * @param {*} text message
 * @param {*} position top | bottom | center | <position>-start | <position>-end | <position>-left | <position>-right
 * @param {*} timer number
 */
const Pop_up = (icon, title, text, position, timer) => {
  // Corrección: "tittle" -> "title"
  const Toast = Swal.mixin({
    toast: true,
    position: position,
    showConfirmButton: false,
    timer: timer || 2200,
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
