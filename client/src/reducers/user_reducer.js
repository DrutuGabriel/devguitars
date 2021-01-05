import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER
} from '../actions/types';

const userReducer = (state = {}, action) => {
  switch(action.type){
    case REGISTER_USER:
      return {...state, register: action.payload.success};
    case LOGIN_USER:
      return {...state, loginSuccess: action.payload.loginSuccess};
    case AUTH_USER:
      return {...state, userData: action.payload};
    default:
      return state;
  }
}

export default userReducer;