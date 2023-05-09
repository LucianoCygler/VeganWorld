import React from "react";
import style from "./NavBar.module.css"


const Navbar = () => {

    return (
        <>
      <div className={style.mainContainer}>
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/cart">My Cart</a>
          </li>
        </ul>
      </div>
      </>
    );
  }

export default Navbar;