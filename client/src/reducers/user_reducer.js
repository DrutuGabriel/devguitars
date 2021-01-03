import {
  LOGIN_USER
} from '../actions/types';

const userReducer = (state = {}, action) => {
  switch(action.type){
    case LOGIN_USER:
      return {...state, loginSuccess: action.payload.loginSuccess}
    default:
      return state;
  }
}

export default userReducer;