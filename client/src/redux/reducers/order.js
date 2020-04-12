import { CREATE_ORDER, READ_ORDER } from './../types';

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
    default:
      return state;
  }
}
