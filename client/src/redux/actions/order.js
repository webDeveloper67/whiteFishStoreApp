import axios from 'axios';
import { CREATE_ORDER } from './../types';

export const createOrder = (
  userId,
  order,
  deliveryAddress
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ order, deliveryAddress });
    const res = await axios.post(`/api/v1/orders/${userId}`, body, config);

    dispatch({
      type: CREATE_ORDER,
      payload: res.data
    });
  } catch (error) {
    const errObj = error.response.data;

    console.log(errObj, 'in create Order action 😃');
  }
};
