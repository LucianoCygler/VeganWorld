import axios from "axios";

import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  CLEAN_DETAIL,
  ADD_CART,
  FILTER_NAME_PRODUCT,
  FILTER_PRICE_PRODUCT,
  STATE_LOGIN,
  GET_CUSTOMER_COMMENTS,
  SET_PAGE,
  CREATE_ORDER,
  GET_CLIENT_ORDERS,
  GET_ORDER_BY_ID,
  VALIDATE_LOGIN,
  REGISTER_USER,
  DELETE_ORDER,
  UPDATE_ORDER,
  GET_CLIENT_DATA,
  UPDATE_CLIENT_DATA,
  DELETE_CLIENT,
  CREATE_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
  GET_CLIENT_REVIEW,
  GET_CLIENT_REVIEWS,
  ORDER_FILTER,
  GET_FAVORITES,
  CREATE_FAVORITE,
  DELETE_FAVORITE,
  DROP_PRODUCT,

  INCREMENT_PRODUCT,
  DECREMENT_PRODUCT


} from "./Types/Types";

const URL_SERVIDOR = "http://localhost:3001";

/*TODOS LOS PRODUCTOS*/
export const getAllProducts = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${URL_SERVIDOR}/product`);
      const products = res.data;
      dispatch({ type: GET_ALL_PRODUCTS, payload: products });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

/*OBTENER PRODUCTO POR ID*/
export const getProductById = (id_product) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${URL_SERVIDOR}/product/${id_product}`);
      const product = res.data;
      dispatch({ type: GET_PRODUCT_BY_ID, payload: product });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

/* LIMPIAR DETAILS */
export const cleanDetail = () => ({ type: CLEAN_DETAIL });

/* OBETENER COMENTARIOS DE LOS CLIENTES */
export const getCustomerComments = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${URL_SERVIDOR}/pagereview`);
      const comm = res.data;
      dispatch({ type: GET_CUSTOMER_COMMENTS, payload: comm });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

/* AÑADIR PRODUCTO A LA CART, PRODUCTO Y CANTIDAD */
export const addCartProduct = (product, quantity) => ({
  type: ADD_CART,
  payload: product,
  quantity: quantity,
});

/* ELIMINAR PRODUCTO POR ID */

export const dropProduct = (id)=>({type: DROP_PRODUCT, payload: id})

export const incrementProduct = (id) => ({type:INCREMENT_PRODUCT, payload: id})

export const decrementProduct = (id) => ({type:DECREMENT_PRODUCT, payload: id})


export const filterNameProduct = (product) => ({
  type: FILTER_NAME_PRODUCT,
  payload: product,
});

/* FILTRAR POR PRECIO DEL PRODUCTO */
export const filterPriceProduct = (product) => ({
  type: FILTER_PRICE_PRODUCT,
  payload: product,
});

//!CAMBIA ESTADO LOGIN
export const changeStateLogin = (boolean) => {
  return { type: STATE_LOGIN, payload: boolean };
};

//! CAMBIAR PAGINA
export const changePage = (number) => {
  return { type: SET_PAGE, payload: number };
};

// ACTIONS NECESARIAS:

//* getAllProducts
//* getProductById
//* createOrder
//* getOrders
//* getOrderDetail
//! deleteOrder
//! updateOrder
//! getClientData
//! updateClientData
//! deleteClient

// order = {
//   precioTotal: 1000,
//   cliente_id: 1,
//   productos: [1,3,2],
// };

/* CREAR ORDEN */
export const createOrder = (order) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${URL_SERVIDOR}/order`, order);
      const newOrder = res.data;
      return dispatch({ type: CREATE_ORDER, payload: newOrder });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

/* OBTENER LAS ORDENES DEL CLIENTE POR ID */
export const getClientOrders = (id_client) => {
  //El id del cliente
  return async function (dispatch) {
    try {
      const res = await axios.get(`${URL_SERVIDOR}/client/orders/${id_client}`);
      const orders = res.data;
      return dispatch({ type: GET_CLIENT_ORDERS, payload: orders });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

/* OBTENER DETALLES DE LAS ORDENES POR ID */
export const getOrderDetail = (id_order) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${URL_SERVIDOR}/order/${id_order}`);
      const order = res.data;
      return dispatch({ type: GET_ORDER_BY_ID, payload: order });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

/* VALIDACION DEL LOGIN */
export const validateLogin = (user) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${URL_SERVIDOR}/client/checkclient`, user);
      const userDB = res.data;
      return dispatch({ type: VALIDATE_LOGIN, payload: userDB });
    } catch (error) {
      alert(error.message);
    }
  };
};

/* REGISTRAR USUARIO */
export const registerUser = (user) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${URL_SERVIDOR}/client`, user);
      const userDB = res.data;
      return dispatch({ type: REGISTER_USER, payload: userDB });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

/* ELIMINAR ORDEN POR ID */
export const deleteOrder = (order_id) => {
  return async function (dispatch) {
    try {
      const res = await axios.delete(`${URL_SERVIDOR}/order/${order_id}`);
      const orderDB = res.data;
      return dispatch({ type: DELETE_ORDER, payload: orderDB });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

/* MODIFICAR ORDEN POR ID */
export const updateOrder = (order_id) => {
  return async function (dispatch) {
    try {
      const res = await axios.patch(`${URL_SERVIDOR}/order/${order_id}`);
      const orderDB = res.data;
      return dispatch({ type: UPDATE_ORDER, payload: orderDB });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

/* OBTENER INFO DEL CLIENTE */
export const getClientData = (client_id) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${URL_SERVIDOR}/client/${client_id}`);
      const clientDB = res.data;
      return dispatch({ type: GET_CLIENT_DATA, payload: clientDB });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

/* MODIFICAR DATA DEL CLIENTE */
export const updateClientData = (client_id, newData) => {
  return async function (dispatch) {
    try {
      const res = await axios.patch(
        `${URL_SERVIDOR}/client/${client_id}`,
        newData
      );
      const clientDataDB = res.data;
      return dispatch({ type: UPDATE_CLIENT_DATA, payload: clientDataDB });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

/* ELIMINAR CLIENTE */
export const deleteClient = (client_id) => {
  return async function (dispatch) {
    try {
      const res = await axios.delete(`${URL_SERVIDOR}/client/${client_id}`);
      const clientDB = res.data;
      return dispatch({ type: DELETE_CLIENT, payload: clientDB });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

/* CREAR COMENTARIO DE CLIENTE */
export const createReview = (newReview) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${URL_SERVIDOR}/review`, newReview);
      const reviewDB = res.data;
      return dispatch({ type: CREATE_REVIEW, payload: reviewDB });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

/* MODIFICAR COMENTAROP */
export const updateReview = (review__id, newReview) => {
  return async function (dispatch) {
    try {
      const res = await axios.patch(
        `${URL_SERVIDOR}/review/${review__id}`,
        newReview
      );
      const reviewDB = res.data;
      return dispatch({ type: UPDATE_REVIEW, payload: reviewDB });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

/* ELIMINAR COMENTARIO */
export const deleteReview = (review__id) => {
  return async function (dispatch) {
    try {
      const res = await axios.delete(`${URL_SERVIDOR}/review/${review__id}`);
      const reviewDB = res.data;
      return dispatch({ type: DELETE_REVIEW, payload: reviewDB });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

// OBTENER COMENTARIOS DEL CLIENTE POR ID
export const getClientReviews = (id_client) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${URL_SERVIDOR}/review/client/${id_client}`);
      const reviewsDB = res.data;
      return dispatch({ type: GET_CLIENT_REVIEWS, payload: reviewsDB });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

/* OBTENER COMENTARIO DE CLIENTE POR ID  */
export const getClientReview = (id_review) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${URL_SERVIDOR}/review/${id_review}`);
      const reviewDB = res.data;
      return dispatch({ type: GET_CLIENT_REVIEW, payload: reviewDB });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

//ORDENAMIENTO Y FILTRADO
export const orderAndFilter = (filterByType, sortByName, sortByPrice) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(
        `${URL_SERVIDOR}/product?filterByType=${filterByType}&sortByName=${sortByName}&sortByPrice=${sortByPrice}`
      );
      const filterProducts = res.data;
      return dispatch({ type: ORDER_FILTER, payload: filterProducts });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

//OBTENER FAVORITOS
export const getFavorites = (id_client) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(
        `${URL_SERVIDOR}/favorite/client/${id_client}`
      );
      const clientFavorites = res.data;
      return dispatch({ type: GET_FAVORITES, payload: clientFavorites });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

//CREAR FAVORITOS
export const createFavorite = (favorite) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${URL_SERVIDOR}/favorite`, favorite);
      const favoriteDB = res.data;
      return dispatch({ type: CREATE_FAVORITE, payload: favoriteDB });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

//ELIMINAR FAVORITOS
export const deleteFavorite = (favorite_id) => {
  return async function (dispatch) {
    try {
      const res = await axios.delete(`${URL_SERVIDOR}/favorite/${favorite_id}`);
      const favoriteDB = res.data;
      return dispatch({ type: DELETE_FAVORITE, payload: favoriteDB });
    } catch (error) {
      alert(error.response.data);
    }
  };
};
