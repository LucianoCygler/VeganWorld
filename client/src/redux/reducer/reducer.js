import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  CLEAN_DETAIL,
  ADD_CART,
  FILTER_NAME_PRODUCT,
  FILTER_PRICE_PRODUCT,
  STATE_LOGIN,
  COMMENTS_CUSTOMER,
  SET_PAGE,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  GET_ORDERS,
  GET_ORDER_BY_ID,
	DROP_PRODUCT,
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
      return { ...state, product: [action.payload] };

    case CLEAN_DETAIL:
      return { ...state, product: [] };

      case ADD_CART:
        if (state.cart && !state.cart.find(action.payload.id)) {
          alert("producto anadido");
          return {
            ...state,
            cart: [...state.cart,
                {
                  id: action.payload.id,
                  nombre: action.payload.nombre,
                  precio: action.payload.precio,
                  cantidad: action.quantity,
                  importe: action.payload.precio * action.quantity,
                  imagen: action.payload.imagen
                },
            ],
          };
        } else {
          alert("el producto ya esta en el carrito");
          return { ...state };
        }
  
    case DROP_PRODUCT:
      return {...state, cart: [...state.cart.filter(product => Number(product.id) !== Number(action.payload) )]}

    case FILTER_NAME_PRODUCT:
      return { ...state, filteredProducts: [...action.payload] };

    case FILTER_PRICE_PRODUCT:
      return { ...state, filteredProducts: [action.payload] };

    case STATE_LOGIN:
      return { ...state, access: action.payload };

    case COMMENTS_CUSTOMER:
      return { ...state, customerComments: [action.payload] };

    case SET_PAGE:
      return { ...state, currentPage: [action.payload] };
    case CREATE_ORDER_SUCCESS:
      return { ...state, success: [action.payload] };
    case CREATE_ORDER_ERROR:
      return { ...state, success: [action.payload] };
    case GET_ORDERS:
      return { ...state, orders: [action.payload] };
    case GET_ORDER_BY_ID:
      return { ...state, order: [action.payload] };

    default:
      return { ...state };
  }
}
