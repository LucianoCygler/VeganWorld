import React, { useState } from "react";
import { auth } from "../../Firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import style from "./Resetpass.module.css";

function Resetpass() {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleClick = () => {
    console.log(email);
    sendPasswordResetEmail(auth, email)


  .then(function() {
    // Correo electrónico de restablecimiento de contraseña enviado.
    alert("correo enviado");
  })
  .catch(function(error) {
    // Ocurrió un error al enviar el correo electrónico de restablecimiento de contraseña.
    console.log(error);
  });
  }
  


  return (
    <div>
    

      <div className={style.container}>
        <h1>RESETPASS</h1>
    
        <div >
          <label htmlFor="email"></label>
          <input
            className={style.input}
            value={email}
            onChange={handleChange}
            name="name"
            placeholder="EMAIL"
            type="text"
          />
          <button   className={style.button} onClick={handleClick}>Send Email to reset a password</button>
        </div>
      </div>
    </div>
  );
}

export default Resetpass;
