import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  CLEAN_DETAIL,
  ADD_CART,
  FILTER_NAME_PRODUCT,
  FILTER_PRICE_PRODUCT,
  STATE_LOGIN,
  SET_PAGE,
  CREATE_ORDER,
  GET_ORDERS,
  GET_ORDER_BY_ID,
  GET_CUSTOMER_COMMENTS,
	DROP_PRODUCT,
  GET_CLIENT_REVIEWS,
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
  orders: [],
  order: {},
  success: [],
  user: {},
  reviews: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENT_REVIEWS:
      return {
        ...state,
        reviews: [...action.payload],
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: [...action.payload],
        filteredProducts: [...action.payload],
      };

		case GET_PRODUCT_BY_ID:
			return { ...state, product: [action.payload] };

		case CLEAN_DETAIL:
			return { ...state, product: [] };

		case ADD_CART:
			if (!state.cart.find(action.payload.name)) {

				alert("producto anadido");
				return {
					...state,
					cart: [
						...state.cart,
						{
							id: action.payload.id,
							nombre: action.payload.nombre,
							precio: action.payload.precio,
							cantidad: action.quantity,
							importe: action.payload.precio * action.quantity,
							imagen: action.payload.imagen,
						},
					],
				};
			} else {
				alert("el producto ya esta en el carrito");
				return { ...state };
			}

		case DROP_PRODUCT:
			return {
				...state,
				cart: [
					...state.cart.filter(
						(product) => Number(product.id) !== Number(action.payload)
					),
				],
			};

		case FILTER_NAME_PRODUCT:
			return { ...state, filteredProducts: [...action.payload] };

		case GET_CUSTOMER_COMMENTS:
			return { ...state, customerComments: [action.payload] };

    case SET_PAGE:
      return { ...state, currentPage: [action.payload] };
    case CREATE_ORDER:
      return { ...state, success: [action.payload] };
    //case CREATE_ORDER_ERROR:
    //  return { ...state, success: [action.payload] };
    case GET_ORDERS:
      return { ...state, orders: [action.payload] };
    case GET_ORDER_BY_ID:
      return { ...state, order: [action.payload] };

		case CREATE_ORDER_SUCCESS:
			return { ...state, success: [action.payload] };

		default:
			return { ...state };
	}
}
