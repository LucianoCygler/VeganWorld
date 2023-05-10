import {
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID,
    ADD_CART,
    FILTER_NAME_PRODUCT,
    FILTER_PRICE_PRODUCT,
    STATE_LOGIN,
    COMMENTS_CUSTOMER
} from "../actions/Types/Types";

const initialState = {
    products: [],
    filteredProducts: [],
    product:[],
    cart: [],
    customerComments : [],
    access: false,
    currentPage: 0,
    itemsPerPage: 3,
}

export default function rootReducer (state = initialState, action) {
    switch (action.type){
        case GET_ALL_PRODUCTS:
            return { ...state, products: [...action.payload] };
        
        case GET_PRODUCT_BY_ID:
            return { ...state, product: action.payload };

        case ADD_CART:
            return { ...state, cart: [action.payload] };
        
        case FILTER_NAME_PRODUCT:
            return { ...state, filteredProducts: [...action.payload]};

        case FILTER_PRICE_PRODUCT:
            return { ...state, filteredProducts: [action.payload]};

        case STATE_LOGIN:
            return {...state, access: action.payload}

        case COMMENTS_CUSTOMER:
            return {...state, customerComments: [...action.payload]}

        default:
            return {...state}
    }
}