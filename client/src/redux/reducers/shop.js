import {
  LIST_SHOPS,
  GET_SHOP,
  CREATE_SHOP,
  OWNER_SHOPS,
  DELETE_SHOP
} from './../types';

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
    case DELETE_SHOP:
      return {
        ...state,
        ownerShops: state.ownerShops.filter(shopEl => shopEl._id !== payload),
        shops: state.shops.map(
          shop => (shop._id === payload ? { ...shop } : state.shops)
        ),
        loading: false
      };
    default:
      return state;
  }
}
