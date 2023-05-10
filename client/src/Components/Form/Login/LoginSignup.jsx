import style from "./LoginSignup.module.css";
import { useState } from "react";
import {  useDispatch } from 'react-redux'
import { changeStateLogin } from "../../../redux/actions/actions";
import { useNavigate } from "react-router-dom";


const LoginSignup = () => {


  /* PUERBA USERNAME Y PASSWORD */
  const username = "cohorte38";
  const password = "veganworld"
  /* */

  const dispatch = useDispatch();
  // const access = useSelector((state)=> state.access);
  const navigate = useNavigate()


  const [login, setLogin] = useState({
    username : "",
    password : ""
  })




  const handleInputChange = (event)=>{
    setLogin({...login, [event.target.name]: event.target.value})
  }


  const accessVerified = (login) =>{
    if (username === login.username && password === login.password) {
      dispatch(changeStateLogin(true))
      navigate("/Home")
    }else{
      throw new Error("Error en la información introducida")
    }
  }


  const handleButtonAccess = (event)=>{
    event.preventDefault();
    accessVerified(login)
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
          name="username"
          value={login.username}/>

          <input 
          type="text" 
          className={style.input} 
          placeholder="Password" 
          onChange={handleInputChange} 
          name="password"
          value={login.password}/>

          <button className={style.btn} onClick={handleButtonAccess}>Login</button>
          <span className={style.switch}>
            Don't have an account?
            <label htmlFor="signup_toggle" className={style.signup_tog}>
              <span>Sign Up</span>
            </label>
          </span>
        </div>
      </form>
    </div>
  );
};
export default LoginSignup;
