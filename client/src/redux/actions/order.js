import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import {
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  READ_ORDER,
  READ_ORDER_ERROR,
  LIST_ORDER_BY_SHOP,
  LIST_ORDER_BY_SHOP_ERROR,
  STATUS_VALUES,
  STATUS_VALUES_ERROR
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

// List Order By ShopId
export const listOrderByShop = shopId => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/orders/shop/${shopId}`);

    dispatch({
      type: LIST_ORDER_BY_SHOP,
      payload: res.data
    });
  } catch (error) {
    const orderByShopErr = error.response.data.message;

    dispatch({
      type: LIST_ORDER_BY_SHOP_ERROR
    });

    toastr.error(orderByShopErr);
  }
};

// Get Status Values in CartItem Schema
export const getStatusValues = () => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/orders/status_values`);

    dispatch({
      type: STATUS_VALUES,
      payload: res.data
    });
  } catch (error) {
    const statusValErr = error.response.data.message;

    dispatch({
      type: STATUS_VALUES_ERROR
    });

    toastr.error(statusValErr);
  }
};
