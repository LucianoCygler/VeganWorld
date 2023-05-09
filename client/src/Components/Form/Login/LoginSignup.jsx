import style from "./LoginSignup.module.css";
import { useState } from "react";

const LoginSignup = () => {

  const username = "Diegotorres";
  const password = "Veganworld"

  




  return (
    <div className={style.container}>
      <form className={style.form}>
        <div className={style.form_front}>
          <div className={style.form_details}>Login</div>
          <input type="text" className={style.input} placeholder="Username" />
          <input type="text" className={style.input} placeholder="Password" />
          <button className={style.btn}>Login</button>
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
