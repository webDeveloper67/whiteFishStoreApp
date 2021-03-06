import axios from 'axios';
import {
  LIST_SHOPS,
  ERROR_SHOPS,
  GET_SHOP,
  CREATE_SHOP,
  NEW_SHOP_ERROR,
  OWNER_SHOPS,
  OWNER_SHOPS_ERROR,
  UPDATE_SHOP,
  DELETE_SHOP,
  DELETE_SHOP_ERROR
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
    let createShopErr = error.response.data.message;

    dispatch({
      type: NEW_SHOP_ERROR
    });

    toastr.error(createShopErr);
  }
};

// List Shops By Owner
export const listShopByOwner = userId => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.get(`/api/v1/shops/by/${userId}`, config);

    dispatch({
      type: OWNER_SHOPS,
      payload: res.data
    });
  } catch (error) {
    let listShopByOwnErr = error.response.data.message;

    dispatch({
      type: OWNER_SHOPS_ERROR
    });

    toastr.error(listShopByOwnErr);
  }
};

// Update Shop
export const updateShop = (shopId, shop, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  const body = shop;

  try {
    const res = await axios.put(`/api/v1/shops/${shopId}`, body, config);

    dispatch({
      type: UPDATE_SHOP,
      payload: res.data
    });

    toastr.success('Success', 'Shop successfully Updated.');
    history.push('/seller/shops');
  } catch (error) {
    console.log(error.response.data, '🤓');
  }
};

// Delete a Shop
export const deleteShop = shopId => async dispatch => {
  try {
    await axios.delete(`/api/v1/shops/${shopId}`);

    dispatch({
      type: DELETE_SHOP,
      payload: shopId
    });

    toastr.success('Success', 'Shop successfully deleted.');
  } catch (error) {
    const delShopErr = error.response.data.message;

    dispatch({
      type: DELETE_SHOP_ERROR
    });

    toastr.error(delShopErr);
  }
};
