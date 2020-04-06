import {
  GET_PRODUCT,
  LIST_PRODUCT_BY_SHOP,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  LIST_RELATED
} from './../types';

const initialState = {
  products: [],
  product: null,
  suggestions: [],
  newProduct: [],
  categories: [],
  results: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCT:
      return {
        ...state,
        product: payload
      };
    case LIST_PRODUCT_BY_SHOP:
      return {
        ...state,
        products: payload
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        newProduct: payload
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(prod => prod._id !== payload)
      };
    case LIST_RELATED:
      return {
        ...state,
        suggestions: payload
      };
    default:
      return state;
  }
}
