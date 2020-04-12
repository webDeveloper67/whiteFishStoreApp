import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import {
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  READ_ORDER,
  READ_ORDER_ERROR
} from './../types';

// Create Order
export const createOrder = (
  userId,
  deliveryAddress,
  order
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ deliveryAddress, ...order });
    const res = await axios.post(`/api/v1/orders/${userId}`, body, config);

    dispatch({
      type: CREATE_ORDER,
      payload: res.data
    });
  } catch (error) {
    const createOrderErr = error.response.data.message;

    dispatch({
      type: CREATE_ORDER_ERROR
    });

    toastr.error(createOrderErr);
  }
};

// Read specific Order via orderId
export const readOrder = orderId => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/orders/${orderId}`);

    dispatch({
      type: READ_ORDER,
      payload: res.data
    });
  } catch (error) {
    const readOrderErr = error.response.data.message;

    dispatch({
      type: READ_ORDER_ERROR
    });

    toastr.error(readOrderErr);
  }
};
