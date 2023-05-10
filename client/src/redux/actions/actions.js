import { 
    ADD_CART,
    FILTER_NAME_PRODUCT, 
    FILTER_PRICE_PRODUCT,
    STATE_LOGIN
} from "./Types/Types";

// import axios from "axios";
// const URL = "hhtp://localhost:3001";

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