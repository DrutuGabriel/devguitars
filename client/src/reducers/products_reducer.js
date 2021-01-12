import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL
} from '../actions/types';

const userReducer = (state = {}, action) => {
  switch(action.type){
    case GET_PRODUCTS_BY_SELL:
      return {...state, bySell: action.payload};
    case GET_PRODUCTS_BY_ARRIVAL:
      return {...state, byArrival: action.payload};
    default:
      return state;
  }
}

export default userReducer;