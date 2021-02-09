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
} from "../actions/types";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload.success };
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload.loginSuccess };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    case ADD_TO_CART_USER:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload,
        },
      };
    case GET_CART_ITEMS:
      return {
        ...state,
        cartDetails: action.payload,
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartDetails: action.payload.cartDetails,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
        },
      };
    case ON_SUCCESS_BUY:
      return {
        ...state,
        successBuy: action.payload.success,
        cartDetails: action.payload.cartDetails,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
        },
      };
    case UPDATE_USER_DATA:
    case CLEAR_UPDATE_USER_DATA:
      return {
        ...state,
        profileUpdated: action.payload.success
      };
    default:
      return state;
  }
};

export default userReducer;
