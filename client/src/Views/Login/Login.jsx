import { LoginSignup } from "../../Components"
import style from "./Login.module.css"
import { NavLink } from 'react-router-dom'



const Login = () =>{
    
    return (

    <div> 
        <div>
        <NavLink to={"/"} className={style.title}>
        <h2> VEGAN WORLD!</h2>
        </NavLink>
        <h4>💚Bienvenido nuevamente!</h4>
        </div>
        <div>
        <LoginSignup/>
        </div>
    </div>

    )


}

export default Login