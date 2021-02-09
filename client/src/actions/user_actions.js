import axios from 'axios';
import {
  LOGIN_USER, 
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY,
  UPDATE_USER_DATA,
  CLEAR_UPDATE_USER_DATA
} from './types';

import {USER_SERVER, PRODUCT_SERVER} from '../components/utils/misc';

export function loginUser(dataToSubmit){
  const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function registerUser(dataToSubmit){
  const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
    .then(response => response.data);

    return {
      type: REGISTER_USER,
      payload: request
    }
}

export function auth(){
  const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
      type: AUTH_USER,
      payload: request
    };
}

export function logoutUser(){
  const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

  return {
    type: LOGOUT_USER,
    payload: request
  }
}

export function addToCart(_id){
  const request = axios.post(`${USER_SERVER}/add-to-cart?productId=${_id}`)
    .then(response =>  response.data);

  return {
    type: ADD_TO_CART_USER,
    payload: request
  }
}

export function getCartItems(cartItems, userCart) {
  const idsString = cartItems.join(",");
  const request = axios
    .get(`${PRODUCT_SERVER}/articles_by_id?type=array&id=${idsString}`)
    .then((response) => {
      const cartMapQuantity = {};
      
      userCart.forEach(item => {
        cartMapQuantity[item.id] = item.quantity;
      });

      response.data.forEach((item, i) => {
        response.data[i].quantity = cartMapQuantity[item._id];
      });

      return response.data;
    });

  return {
    type: GET_CART_ITEMS,
    payload: request,
  };
}

export function removeCartItem(id){
  const request = axios.get(`${USER_SERVER}/remove-from-cart?_id=${id}`)
    .then(response => {
      const cartMapQuantity = {};

      response.data.cart.forEach(item => {
        cartMapQuantity[item.id] = item.quantity;
      });

      response.data.cartDetails.forEach((item, i) => {
          response.data.cartDetails[i].quantity = cartMapQuantity[item._id];
      });

      return response.data;
    });

  return {
    type: REMOVE_CART_ITEM,
    payload: request
  }
}

export function onSuccessBuy(data){

  const request = axios.post(`${USER_SERVER}/success-buy`, data)
    .then(response => response.data);

  return {
    type: ON_SUCCESS_BUY,
    payload: request
  }
}

export function updateUserData(data){
  const request = axios.post(`${USER_SERVER}/update-profile`, data)
    .then(response => response.data);

  return {
    type: UPDATE_USER_DATA,
    payload: request
  };
}

export function clearUpdateUser(){
  return {
    type: CLEAR_UPDATE_USER_DATA,
    payload: ''
  }
}