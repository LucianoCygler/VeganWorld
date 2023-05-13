import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  CLEAN_DETAIL,
  ADD_CART,
  FILTER_NAME_PRODUCT,
  FILTER_PRICE_PRODUCT,
  STATE_LOGIN,
  GET_CLIENT_DATA,
  SET_PAGE,
  GET_CLIENT_ORDERS,
  GET_ORDER_BY_ID,
  GET_CUSTOMER_COMMENTS,
<<<<<<< HEAD
	DROP_PRODUCT,
=======
  CREATE_ORDER,
  DROP_PRODUCT,
  DELETE_ORDER,
>>>>>>> 9b943a88c539f11abdf35f18daec832bd8e8226c
  GET_CLIENT_REVIEWS,
  UPDATE_REVIEW,
  VALIDATE_LOGIN,
  ORDER_FILTER,
  SET_PRODUCT_SEARCH,
  CREATE_FAVORITE,
  GET_CLIENT_FAVORITE,
  LOGOUT,
  LOGIN,
} from "../actions/Types/Types";

const initialState = {
  products: [],
  filteredProducts: [],
  product: [],
  cart: [],
  customerComments: [],
  currentPage: 0,
  itemsPerPage: 1,
  orders: [],
  order: {},
  success: [],
  user: {},
  clientOrders: [],
  reviews: [],
  favorite: [],
  favorites: [],
  isAuthenticated: false,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENT_DATA:
      return {
        ...state,
        user: action.payload,
      };

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

    case VALIDATE_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        // Reset other relevant authentication state properties upon logout
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        // Reset other relevant authentication state properties upon logout
      };
    // Other authentication-related action cases

    case CLEAN_DETAIL:
      return { ...state, product: [] };


		case FILTER_NAME_PRODUCT:
			const filterProducts = state.products.filter((product) => {
				const productName = product.nombre.toLowerCase();
				if(action.payload === "") return state.products;
				return productName.includes(action.payload.toLowerCase());
			});
			return { ...state, products: filterProducts };

    case ADD_CART:
      if (!state.cart.find(product => product.id === action.payload.id)) {
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
        throw Error('You product is already in Cart!')
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

    case GET_CUSTOMER_COMMENTS:
      return { ...state, customerComments: [action.payload] };

    case SET_PAGE:
      return { ...state, currentPage: [action.payload] };

    case CREATE_ORDER:
      return { ...state, success: [action.payload] };

    case GET_ORDER_BY_ID:
      return { ...state, order: [action.payload] };

    case GET_CLIENT_ORDERS:
      return { ...state, clientOrders: action.payload };

    // case DELETE_ORDER:
    //   const orderId = action.payload;
    //   const updatedOrders = state.clientOrders.filter(
    //     (order) => order.id !== orderId
    //   );

    case UPDATE_REVIEW:
      const { id, titulo, descripcion } = action.payload;
      const fecha = new Date().toISOString().slice(0, 10);
      const updatedReviews = state.reviews.map((review) => {
        if (review.id === id) {
          return {
            ...review,
            titulo,
            descripcion,
            fecha,
          };
        }
        return review;
      });
      return {
        ...state,
        reviews: updatedReviews,
      };

    case ORDER_FILTER:
      return {
        ...state,
        products: action.payload,
      };
    case SET_PRODUCT_SEARCH:
      return {
        ...state,
        products: action.payload,
      };
    case CREATE_FAVORITE:
      return {
        ...state,
        favorite: action.payload,
      };
    case GET_CLIENT_FAVORITE:
      return {
        ...state,
        favorites: [...action.payload],
      };
    default:
      return { ...state };
  }
}
