
import style from "./LandingPage.module.css"
import LoginSignup from "../../Components/Form/Login/LoginSignup"
import CustomerComments from "./Extras/Comments"


const LandingPage = ()=>{

    

return (
    <div className= {style.parent}>
    <div className= {style.div1}>

    "hello"

    </div>

    <div className={style.div2}>
        <CustomerComments/>
    </div>

    <div className={style.div3}>
        <LoginSignup/>
    </div>

    <div className={style.div4}>
    Aqui va pie de pagina

    </div>

    </div>
)
    

}

export default LandingPage