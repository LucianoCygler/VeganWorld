import axios from "axios";

import { 
    GET_ALL_PRODUCTS,
    ADD_CART,
    FILTER_NAME_PRODUCT, 
    FILTER_PRICE_PRODUCT,
    STATE_LOGIN
} from "./Types/Types";

const URL_MOCKY  = "https://run.mocky.io/v3/5c43f655-9150-4673-a3fe-387e9f1d03b1"

export const getAllProducts = () => {
	return async function (dispatch) {
		const res = await axios.get(URL_MOCKY);
        const products = res.data
		return dispatch({ type: GET_ALL_PRODUCTS, payload: products });
	};
};

export const addCartProduct = (product) => ({
    type: ADD_CART,
    payload: product
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