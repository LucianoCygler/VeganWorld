
import style from "./LandingPage.module.css"
import LoginSignup from "./Login/LoginSignup"


const LandingPage = ()=>{

return (
    <div className= {style.parent}>
    <div className= {style.div1}>

    "hello"

    </div>

    <div className={style.div2}>
    Aqui ira los comentarios

    </div>

    <div className={style.div3}>
        <LoginSignup/>
    </div>

    </div>
)
    

}

export default LandingPage