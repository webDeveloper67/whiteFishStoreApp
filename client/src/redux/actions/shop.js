import axios from 'axios';
import {
  LIST_SHOPS,
  ERROR_SHOPS,
  GET_SHOP,
  CREATE_SHOP,
  NEW_SHOP_ERROR
} from './../types';
import { toastr } from 'react-redux-toastr';

// Get all shops
export const listShops = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/shops');

    dispatch({
      type: LIST_SHOPS,
      payload: res.data
    });
  } catch (error) {
    let listShopsErr = error.response.data.message;

    dispatch({
      type: ERROR_SHOPS
    });
    toastr.error(listShopsErr);
  }
};

// Get Single Shop
export const getShop = shopId => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/shops/${shopId}`);

    dispatch({
      type: GET_SHOP,
      payload: res.data
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

// Create shop
export const createShop = (userId, shopData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  const body = shopData;

  try {
    const res = await axios.post(`/api/v1/shops/by/${userId}`, body, config);

    dispatch({
      type: CREATE_SHOP,
      payload: res.data
    });
    history.push('/seller/shops');
  } catch (error) {
    console.log(error.response.data);

    dispatch({
      type: NEW_SHOP_ERROR
    });
  }
};
