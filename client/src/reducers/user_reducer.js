import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM
} from '../actions/types';

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
        cartDetails: action.payload
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartDetails: action.payload.cartDetails,
        userData: {
          ...state.userData,
          cart: action.payload.cart
        }
      }
    default:
      return state;
  }
}

export default userReducer;