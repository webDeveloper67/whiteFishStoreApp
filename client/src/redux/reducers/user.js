import { GET_USER, UPDATE_ME, DELETE_ME } from './../types';

const initialState = {
  authUser: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
    case UPDATE_ME:
      return {
        ...state,
        authUser: payload
      };
    case DELETE_ME:
      return {
        ...state,
        authUser: null
      };
    default:
      return state;
  }
}
