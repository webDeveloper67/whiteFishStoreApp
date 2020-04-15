import {
  CREATE_ORDER,
  READ_ORDER,
  LIST_ORDER_BY_SHOP,
  STATUS_VALUES
} from './../types';

const initialState = {
  order: {},
  orders: [],
  statusValues: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_ORDER:
      return {
        ...state,
        order: payload
      };
    case READ_ORDER:
      return {
        ...state,
        order: payload
      };
    case LIST_ORDER_BY_SHOP:
      return {
        ...state,
        orders: payload
      };
    case STATUS_VALUES:
      return {
        ...state,
        statusValues: payload
      };
    default:
      return state;
  }
}
