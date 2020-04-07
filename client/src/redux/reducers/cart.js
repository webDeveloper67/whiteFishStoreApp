import { ADD_CART_ITEM } from '../types';

const initialState = {
  cart: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_CART_ITEM:
      return {
        ...state,
        cart: [...state.cart, payload]
      };
    default:
      return state;
  }
}
