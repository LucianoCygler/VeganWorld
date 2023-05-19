import React, { useState } from 'react'
import s from './Resetpass.module.css'
import {auth} from '../../Firebase/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'


function Resetpass() {
  
  
  const [email, setEmail] = useState("")
  
  
  const handleChange = (e) => {
    setEmail(e.target.value)    
  }


  const handleClick = () => {
    console.log(email);
    sendPasswordResetEmail(auth, email)
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
    <div className={s.container}>
        
        <h1>RESETPASS</h1>
        <h2>Los expertos en front dar estilos aqui porfa!!!!!</h2>
        <div >
        <label>E-mail</label>
        <input className={s.input} value={email} onChange={handleChange} name='name'  type="text" />
        <button onClick={handleClick}>Send Email to reset a password</button>
      </div>
    </div>
  )
}

export default Resetpass