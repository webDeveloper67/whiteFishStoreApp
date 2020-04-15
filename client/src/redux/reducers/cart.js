import {
  ADD_CART_ITEM,
  RENEW_CART_ITEM,
  UPDATE_CART_ITEM,
  REMOVE_CART_ITEM,
  DELETE_ALL_CART_ITEMS
} from './../types';

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
    case RENEW_CART_ITEM:
      return {
        ...state,
        cart: payload
      };
    case UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map(
          el => (el._id === el.product._id ? { ...el, quantity: payload } : el)
        )
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.splice(payload, 1)
      };
    case DELETE_ALL_CART_ITEMS:
      return {
        ...state,
        cart: []
      };
    default:
      return state;
  }
}
