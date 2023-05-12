import axios from "axios";

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
} from "./Types/Types";

const URL_SERVIDOR = "http://localhost:3001";

export const getAllProducts = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${URL_SERVIDOR}/product`);
      const products = res.data;
      dispatch({ type: GET_ALL_PRODUCTS, payload: products });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getProductById = (id) => {
  return async function (dispatch) {
    const res = await axios.get(`${URL_SERVIDOR}/product/${id}`);
    const product = res.data;
    dispatch({ type: GET_PRODUCT_BY_ID, payload: product });
  };
};

export const cleanDetail = () => ({ type: CLEAN_DETAIL });

export const getCustomerComments = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${URL_SERVIDOR}/pagereview`);
      const comm = res.data;
      dispatch({ type: COMMENTS_CUSTOMER, payload: comm });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const addCartProduct = (product, quantity) => ({
  type: ADD_CART,
  payload: product,
  quantity: quantity,
});

export const dropProduct = (id)=>({type: DROP_PRODUCT, payload: id})

export const filterNameProduct = (product) => ({
  type: FILTER_NAME_PRODUCT,
  payload: product,
});

export const filterPriceProduct = (product) => ({
  type: FILTER_PRICE_PRODUCT,
  payload: product,
});

export const changeStateLogin = (boolean) => {
  return { type: STATE_LOGIN, payload: boolean };
};

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

export const createOrder = (order) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${URL_SERVIDOR}/order`, order);
      const newOrder = res.data;
      return dispatch({ type: CREATE_ORDER_SUCCESS, payload: newOrder });
    } catch (error) {
      return dispatch({ type: CREATE_ORDER_ERROR, payload: error.message });
    }
  };
};

export const getClientOrders = (id) => {
  //El id del cliente
  return async function (dispatch) {
    const res = await axios.get(`${URL_SERVIDOR}/client/orders/${id}`);
    const orders = res.data;
    return dispatch({ type: GET_ORDERS, payload: orders });
  };
};

export const getOrderDetail = (id) => {
  return async function (dispatch) {
    const res = await axios.get(`${URL_SERVIDOR}/order/${id}`);
    const order = res.data;
    return dispatch({ type: GET_ORDER_BY_ID, payload: order });
  };
};
