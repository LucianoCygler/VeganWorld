import axios from "axios";

import { 
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID,
    CLEAN_DETAIL,
    ADD_CART,
    FILTER_NAME_PRODUCT, 
    FILTER_PRICE_PRODUCT,
    STATE_LOGIN,
    COMMENTS_CUSTOMER
} from "./Types/Types";

const URL_MOCKY  = "https://run.mocky.io/v3/5c43f655-9150-4673-a3fe-387e9f1d03b1"
const URL_COMMENTS = "https://run.mocky.io/v3/e59ec4e9-ca13-4a15-9763-0058eb2684d6"

export const getAllProducts = () => {
	return async function (dispatch) {
		const res = await axios.get(URL_MOCKY);
        const products = res.data
		return dispatch({ type: GET_ALL_PRODUCTS, payload: products });
	};
};

export const getProductById = (id) =>{
    return async function (dispatch) {
        const res = await axios.get(URL_MOCKY);
        const product = res.data.filter(product => product.id == id)
        return dispatch({type: GET_PRODUCT_BY_ID, payload: product})
    }
}

export const cleanDetail = () => ({type: CLEAN_DETAIL})


export const getCustomerComments = () => {
	return async function (dispatch) {
		const res = await axios.get(URL_COMMENTS);
        const comm = res.data
        console.log(comm);
		return dispatch({ type: COMMENTS_CUSTOMER, payload: comm });
	};
};

export const addCartProduct = (product, quanty) => ({
    type: ADD_CART,
    payload: product,
    quanty: quanty 
});

export const filterNameProduct = (product) => ({
    type: FILTER_NAME_PRODUCT,
    payload: product
});

export const filterPriceProduct = (product) => ({
    type: FILTER_PRICE_PRODUCT,
    payload: product
});

export const changeStateLogin = (boolean) => {
    return { type: STATE_LOGIN, payload: boolean}
}

