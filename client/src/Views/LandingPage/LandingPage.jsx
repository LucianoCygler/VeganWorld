
import style from "./LandingPage.module.css"
import CustomerComments from "../../Components/Comments/Comments"
import { getCustomerComments, changePage } from "../../redux/actions/actions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import logo from "./img/logo4.png"


const LandingPage = ()=>{

    const dispatch = useDispatch();
    const currentPage = useSelector((state)=> state.currentPage)
    const itemsPerPage = useSelector((state)=> state.itemsPerPage)
    const customerComments = useSelector((state)=> state.customerComments)

    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;

    const commentsToShow = customerComments.slice(start, end);


    useEffect(() => {
        dispatch(getCustomerComments())
    }, [])
    


    const handlePagePrev = ()=>{
        dispatch(changePage(currentPage-1))
    }
    
    const handlePageNext = ()=>{
        dispatch(changePage(currentPage+1))
    }


return (
    <div className= {style.parent}>

    <div className= {style.div1}>
    VEGAN WORLD
    </div>
    <div className={style.div2}>
        <button onClick={handlePagePrev} disabled={currentPage === 0}>{"<-"}</button>
        <CustomerComments commentsToShow = {commentsToShow}/>
        <button onClick={handlePageNext} disabled={end > customerComments.length - 1}>{"->"}</button>
    </div>

    <div className={style.div3}>
        
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