import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  CLEAN_DETAIL,
  ADD_CART,
  FILTER_NAME_PRODUCT,
  FILTER_PRICE_PRODUCT,
  STATE_LOGIN,
  SET_PAGE,


  GET_CLIENT_ORDERS,
  GET_ORDER_BY_ID,
  GET_CUSTOMER_COMMENTS,
  CREATE_ORDER,
  DROP_PRODUCT,
  DELETE_ORDER,
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
  clientOrders: [],
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
      if (!state.cart.hasOwnProperty(action.payload.nombre)) {
        alert("producto anadido");
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              [action.payload.nombre]: {
                id: action.payload.id,
                precio: action.payload.precio,
                cantidad: action.quantity,
                importe: action.payload.precio * action.quantity,
                imagen: action.payload.imagen,
              },
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
        cart: state.cart.filter(
          (product) => Object.values(product)[0].id !== action.payload
        ),
      };

    case FILTER_NAME_PRODUCT:
      return { ...state, filteredProducts: [...action.payload] };

    case FILTER_PRICE_PRODUCT:
      return { ...state, filteredProducts: [action.payload] };

    case STATE_LOGIN:
      return { ...state, access: action.payload };

    case GET_CUSTOMER_COMMENTS:
      return { ...state, customerComments: [action.payload] };

    case SET_PAGE:
      return { ...state, currentPage: [action.payload] };

    case CREATE_ORDER:
      return { ...state, success: [action.payload] };

    case GET_CLIENT_ORDERS:
      return { ...state, clientOrders: action.payload };

    case GET_ORDER_BY_ID:
      return { ...state, order: [action.payload] };

    case DELETE_ORDER:
      const orderId = action.payload;
      const updatedOrders = state.clientOrders.filter(
        (order) => order.id !== orderId
      );
      return {
        ...state,
        clientOrders: updatedOrders,
      };

    default:
      return { ...state };
  }
}
