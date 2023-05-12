import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {getClientReviews} from '../../redux/actions/actions';

const MyReviews = ()=>{
    const dispatch = useDispatch();

    const reviews = useSelector((state)=>state.reviews);

    const clientId = 1; 
    //const user = useSelector((state)=>state.user);
    //! Se usa el estado global de los datos del usuario en lugar de la cosnt clientId
    useEffect(()=>{
        dispatch(getClientReviews(clientId));
    }, [dispatch]);
    
    return (
        <>
            <h1>Your reviews</h1>
            
            {reviews.length > 0? <div>
                
                    {reviews.map((element)=>(

                        <>  
                            <hr />
                            <h2>Title: {element.titulo}</h2>
                            <h3>Desc: {element.descripcion}</h3>
                        </>
                    ))}
                    
                    
                
            </div> : <div>
                <h2>You have no reviews yet.</h2>
                <h3>Let's make one ...</h3>
            </div>}
        </>
    );
}

export default MyReviews;