import {
  LOAD_USER,
  REGISTER_SUCCESS,
  SIGN_IN_SUCCESS,
  LOGOUT
} from './../types';

const initialState = {
  user: null,
  isAuthenticated: false,
  token: document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt=\s*\s*([^;]*).*$)|^.*$/,
    '$1'
  )
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload
      };
    case REGISTER_SUCCESS:
    case SIGN_IN_SUCCESS:
      document.cookie = payload.token;
      return {
        ...state,
        ...payload,
        isAuthenticated: true
      };
    case LOGOUT:
      document.cookie =
        'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=127.0.0.1';
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
}
