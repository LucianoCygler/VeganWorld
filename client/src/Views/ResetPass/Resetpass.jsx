import React, { useState } from 'react'
import s from './Resetpass.module.css'
// import { getAuth } from "firebase/auth";
import {auth} from '../../Firebase/firebase'

function Resetpass() {
  // const auth = getAuth()


  const [email, setEmail] = useState("")

  const handleChange = (e) => {
    setEmail(e.target.value)    
  }

  const handleClick = () => {
    auth.sendPasswordResetEmail(email)
  .then(function() {
    // Correo electrónico de restablecimiento de contraseña enviado.
    console.log("correo enviado");
  })
  .catch(function(error) {
    // Ocurrió un error al enviar el correo electrónico de restablecimiento de contraseña.
    console.log(error);
  });
  }
  

  return (
    <div>
        <h1>RESETPASS</h1>
        <h1>RESETPASS</h1>
        <div >
        <label>E-mail</label>
        <input className={s.input} value={email} onChange={handleChange} name='name'  type="text" />
        <button onClick={handleClick}>Send Email to reset a password</button>
      </div>
    </div>
  )
}

export default Resetpass