import {
  GET_PRODUCT,
  LIST_PRODUCT_BY_SHOP,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  LIST_RELATED,
  LIST_CATEGORIES,
  LIST_LATEST,
  LIST_SEARCH,
  LIST_RESULT,
  LIST_RELATED_ERROR,
  LIST_RESULT_ERROR
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
    case LIST_SEARCH:
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
    case LIST_LATEST:
      return {
        ...state,
        suggestions: payload
      };
    case LIST_RELATED_ERROR:
      return {
        ...state,
        suggestions: []
      };
    case LIST_CATEGORIES:
      return {
        ...state,
        categories: payload
      };
    case LIST_RESULT:
      return {
        ...state,
        results: payload
      };
    case LIST_RESULT_ERROR:
      return {
        ...state,
        results: []
      };
    default:
      return state;
  }
}
