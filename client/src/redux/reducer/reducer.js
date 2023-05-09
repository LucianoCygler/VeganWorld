import {
    ADD_CART,
    FILTER_NAME_PRODUCT,
    FILTER_PRICE_PRODUCT
} from "../actions/Types/Types";

const initialState = {
    products: [],
    filteredProducts: [],
    cart: []
}

export default function rootReducer (state = initialState, action) {
    switch (action.type){
        case ADD_CART:
            return { ...state, cart: [action.payload] };
        
        case FILTER_NAME_PRODUCT:
            return { ...state, filteredProducts: [...action.payload]};

        case FILTER_PRICE_PRODUCT:
            return { ...state, filteredProducts: [action.payload]};
    }

}