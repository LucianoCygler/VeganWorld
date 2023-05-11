import {
	GET_ALL_PRODUCTS,
	GET_PRODUCT_BY_ID,
	CLEAN_DETAIL,
	ADD_CART,
	FILTER_NAME_PRODUCT,
	FILTER_PRICE_PRODUCT,
	STATE_LOGIN,
	COMMENTS_CUSTOMER,
    SET_PAGE
} from "../actions/Types/Types";

const initialState = {
	products: [],
	filteredProducts: [],
	product: [],
	cart: [],
	customerComments: [],
	access: false,
	currentPage: 0,
	itemsPerPage: 1,
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_PRODUCTS:
			return {
				...state,
				products: [...action.payload],
				filteredProducts: [...action.payload],
			};

		case GET_PRODUCT_BY_ID:
			return { ...state, product: [...action.payload] };

		case CLEAN_DETAIL:
			return { ...state, product: [] };

		case ADD_CART:
			if (!state.cart.hasOwnProperty(action.payload.name)) {
				alert("producto anadido");
				return { ...state, cart: {...state.cart, [action.payload.name]: action.payload, quanty: action.quanty }};
			} else {
				alert("el producto ya esta en el carrito");
				return { ...state };
			}

		case FILTER_NAME_PRODUCT:
			return { ...state, filteredProducts: [...action.payload] };

		case FILTER_PRICE_PRODUCT:
			return { ...state, filteredProducts: [action.payload] };

		case STATE_LOGIN:
			return { ...state, access: action.payload };

		case COMMENTS_CUSTOMER:
			return { ...state, customerComments: [...action.payload] };

        case SET_PAGE:
            return{...state, currentPage: action.payload }

		default:
			return { ...state};
	}
}
