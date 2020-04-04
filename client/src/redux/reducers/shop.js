import { LIST_SHOPS, GET_SHOP, CREATE_SHOP, OWNER_SHOPS } from './../types';

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
    case OWNER_SHOPS:
      return {
        ...state,
        ownerShops: payload
      };
    default:
      return state;
  }
}
