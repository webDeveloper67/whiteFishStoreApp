import axios from 'axios';
import { GET_USER, UPDATE_ME, DELETE_ME } from './../types';
import { toastr } from 'react-redux-toastr';

export const getUser = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/users/${userId}`);

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (error) {
    const getUserError = error.response.data.message;
    toastr.error(getUserError);
  }
};

export const updateMe = user => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(user);
    await axios.patch(`/api/v1/users/updateMe`, body, config);
    dispatch({
      type: UPDATE_ME,
      payload: user
    });
    toastr.success('Success', 'Profile has been updated');
  } catch (error) {
    const updateUserError = error.response.data.message;
    toastr.error(updateUserError);
  }
};

export const deleteMe = history => async dispatch => {
  try {
    await axios.delete(`/api/v1/users/deleteMe`);

    dispatch({
      type: DELETE_ME
    });
    toastr.success('Success', 'User successfully deleted');
    history.push('/api/v1/shops');
  } catch (error) {
    const deleteUserError = error.response.data.message;
    toastr.error(deleteUserError);
  }
};
