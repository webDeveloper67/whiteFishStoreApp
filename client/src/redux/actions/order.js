import axios from 'axios';
import { CREATE_ORDER } from './../types';

export const createOrder = (
  userId,
<<<<<<< HEAD
  deliveryAddress,
  order
=======
  order,
  deliveryAddress
>>>>>>> 7ac9b6fa3597cf0f242b8e23173850a7c344cc4d
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
<<<<<<< HEAD

    const body = JSON.stringify({ deliveryAddress, ...order });

=======
    const body = JSON.stringify({ order, deliveryAddress });
>>>>>>> 7ac9b6fa3597cf0f242b8e23173850a7c344cc4d
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
