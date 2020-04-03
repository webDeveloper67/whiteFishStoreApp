import axios from 'axios';
import _ from 'lodash';
import {
  LOAD_USER,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  LOGOUT
} from './../types';
import setAuthToken from './../../utils/auth-helper';
import { toastr } from 'react-redux-toastr';

export const loadUser = () => async dispatch => {
  let cookieValue = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt=\s*\s*([^;]*).*$)|^.*$/,
    '$1'
  );
  _.startsWith('jwt=', cookieValue);

  _.split(cookieValue, '; ', 2);

  if (cookieValue) {
    setAuthToken(cookieValue);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookieValue}`
    },
    withCredentials: true
  };

  try {
    const res = await axios.get(`/api/v1/users/me`, config);

    dispatch({
      type: LOAD_USER,
      payload: res.data // payload is user
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = (
  { name, email, password },
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/v1/users/signup', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data // payload is token
    });
    toastr.success('Success', 'successfully signed up.');
    history.push('/');
    dispatch(loadUser());
  } catch (error) {
    let registerErr = error.response.data;

    if (registerErr.error.name === 'ValidationError') {
      const errMsg = Object.values(registerErr.error.errors).map(
        el => el.message
      );

      const message = `Invalid input data. ${errMsg.join('. ')}`;

      dispatch({
        type: REGISTER_FAIL
      });
      toastr.error(message);
    }
  }
};

export const signin = ({ email, password }, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/v1/users/login', body, config);

    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: res.data
    });
    toastr.success('Success', 'successfully signed in.');
    history.push('/');
    dispatch(loadUser());
  } catch (error) {
    let signInErr = error.response.data.message;

    dispatch({
      type: SIGN_IN_FAIL
    });
    toastr.error(signInErr);
  }
};

export const logout = history => dispatch => {
  dispatch({
    type: LOGOUT
  });
  toastr.info('Success', 'successfully signed Out.');
  history.push('/');
};
