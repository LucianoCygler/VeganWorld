import {
    GET_ALL_PRODUCTS,
    ADD_CART,
    FILTER_NAME_PRODUCT,
    FILTER_PRICE_PRODUCT,
    STATE_LOGIN
} from "../actions/Types/Types";

const initialState = {
    products: [],
    filteredProducts: [],
    cart: [],
    access: false,
}

export default function rootReducer (state = initialState, action) {
    switch (action.type){
        case GET_ALL_PRODUCTS:
            return { ...state, products: [...action.payload] };

        case ADD_CART:
            return { ...state, cart: [action.payload] };
        
        case FILTER_NAME_PRODUCT:
            return { ...state, filteredProducts: [...action.payload]};

        case FILTER_PRICE_PRODUCT:
            return { ...state, filteredProducts: [action.payload]};

        case STATE_LOGIN:
            return {...state, access: action.payload}

        default:
            return {...state}
    }
}