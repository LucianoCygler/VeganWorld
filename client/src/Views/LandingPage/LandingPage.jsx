
import style from "./LandingPage.module.css"
import LoginSignup from "../../Components/Form/Login/LoginSignup"
import CustomerComments from "../../Components/Comments/Comments"
import { getCustomerComments } from "../../redux/actions/actions"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import logo from "./img/logo4.png"


const LandingPage = ()=>{

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCustomerComments())
    }, [])
    

return (
    <div className= {style.parent}>

    <div className= {style.div1}>
    VEGAN WORLD
    </div>
    <div className={style.div2}>
        <CustomerComments/>
    </div>

    <div className={style.div3}>
        <LoginSignup/>
    </div>

    <div className={style.div4}>
        
            <div> <img src={logo} alt="LOGO" style={{height: "55px", width: "180px" }}/>  </div>

            <div style={{color: "white"}}> Hecho con 💚. VeganWorld © 2023 | Todos los derechos reservados.</div>

            <div style={{color: "white"}}> ¿Consultas y dudas? Escríbenos a cohorte36@soyVegan.com </div>
    

    </div>

    </div>
)
    

}

export default LandingPage