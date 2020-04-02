import { LOAD_USER, REGISTER_SUCCESS, SIGN_IN_SUCCESS } from './../types';

const initialState = {
  loading: true,
  user: null,
  isAuthenticated: false,
  token: document.cookie
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload
      };
    case REGISTER_SUCCESS:
    case SIGN_IN_SUCCESS:
      document.cookie = payload.token;
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    default:
      return state;
  }
}
