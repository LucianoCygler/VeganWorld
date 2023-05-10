
import style from "./LandingPage.module.css"
import LoginSignup from "../../Components/Form/Login/LoginSignup"
import CustomerComments from "../../Components/Comments/Comments"
import { getCustomerComments } from "../../redux/actions/actions"
import { useDispatch } from "react-redux"
import { useEffect } from "react"


const LandingPage = ()=>{

    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getCustomerComments())
    // }, [])
    

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
        
            <div> <img src="" alt="LOGO" />  </div>

            <div> Hecho con 💚. VeganWorld © 2023 | Todos los derechos reservados.</div>

            <div> ¿Consultas y dudas? Escríbenos a cohorte36@soyVegan.com </div>
    

    </div>

    </div>
)
    

}

export default LandingPage