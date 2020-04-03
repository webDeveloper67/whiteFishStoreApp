import { LIST_SHOPS, GET_SHOP, CREATE_SHOP } from './../types';

const initialState = {
  newShop: [],
  shops: [],
  ownerShops: [],
  shop: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_SHOP:
      return {
        ...state,
        newShop: payload
      };
    case LIST_SHOPS:
      return {
        ...state,
        shops: payload
      };
    case GET_SHOP:
      return {
        ...state,
        shop: payload
      };
    default:
      return state;
  }
}
