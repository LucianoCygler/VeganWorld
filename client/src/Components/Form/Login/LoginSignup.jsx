import style from "./LoginSignup.module.css";
import { useState } from "react";
import {  useDispatch } from 'react-redux'
import { changeStateLogin } from "../../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const LoginSignup = () => {


  /* PUERBA USERNAME Y PASSWORD */
  const username = "cohorte36";
  const password = "veganworld"
  /* */

  const dispatch = useDispatch();
  // const access = useSelector((state)=> state.access);
  const navigate = useNavigate()


  const [login, setLogin] = useState({
    email : "",
    contraseña : ""
  })

  const handleInputChange = (event)=>{
    setLogin({...login, [event.target.name]: event.target.value})
  }


  // const accessVerified = (login) =>{
  //   if (username === login.username && password === login.password) {
  //     dispatch(changeStateLogin(true))
  //     navigate("/Home")
  //   }else{
  //     throw alert("Error en la información introducida")
  //   }
  // }


  const handleButtonAccess = async (event)=>{
    event.preventDefault();
  
    try {
      const verified = await axios.post("http://localhost:3001/client/checkclient/", login)
      const verifydata =verified.data

      if (verifydata) {
        navigate("/")
      }
    } catch (error) {
      alert(error.message);
    }
  
  }


  const handleOnClick = ()=>{
    navigate("/Register")
  }

  return (
    <div className={style.container}>
      <form className={style.form}>
        <div className={style.form_front}>
          <div className={style.form_details}>Login</div>

          <input 
          type="text" 
          className={style.input} 
          placeholder="Username" 
          onChange={handleInputChange} 
          name="email"
          value={login.username}/>

          <input 
          type="password" 
          className={style.input} 
          placeholder="Password" 
          onChange={handleInputChange} 
          name="contraseña"
          value={login.password}/>

          <button className={style.btn} onClick={handleButtonAccess}>Login</button>
          <span className={style.switch}>
            Don't have an account?
            <label htmlFor="signup_toggle" className={style.signup_tog}>
              <span onClick={handleOnClick}>Sign Up</span>
            </label>
          </span>
        </div>
      </form>
    </div>
  );
};
export default LoginSignup;
