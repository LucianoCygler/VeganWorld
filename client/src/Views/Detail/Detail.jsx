import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import { useDispatch } from "react-redux";
import { getProductById } from "../../redux/actions/actions";

function Detail() {
    const {id} = useParams()
    
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getProductById(id))
    },[])
    return (
        <div className={styles.mainContainer}>

            <NavLink to="/home" className={styles.link} >
                {"<"}
            </NavLink>
        </div>
    )
}

export default Detail;