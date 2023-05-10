import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
    return (
        <div className={styles.mainContainer}>
            <div>PRUEBA</div>
            <div>PRUEBA</div>
            <NavLink to="/home" className={styles.link} >
                {"<"}
            </NavLink>
        </div>
    )
}

export default Detail;