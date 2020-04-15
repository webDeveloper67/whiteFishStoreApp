import axios from 'axios';
import {
  GET_PRODUCT,
  LIST_PRODUCT_BY_SHOP,
  LIST_PRODUCT_BY_SHOP_ERR,
  CREATE_PRODUCT,
  CREATE_PRODUCT_ERROR,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_ERROR,
  LIST_RELATED_ERROR,
  LIST_RELATED,
  LIST_LATEST,
  LIST_LATEST_ERROR,
  LIST_CATEGORIES,
  LIST_CATEGORIES_ERROR,
  LIST_SEARCH,
  LIST_RESULT,
  LIST_RESULT_ERROR
} from './../types';
import { toastr } from 'react-redux-toastr';
import queryString from 'query-string';

// Create Product
export const createProduct = (
  shopId,
  productData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  const body = productData;

  try {
    const res = await axios.post(`/api/v1/products/by/${shopId}`, body, config);

    dispatch({
      type: CREATE_PRODUCT,
      payload: res.data
    });

    history.push(`/seller/shop/edit/${shopId}`);
  } catch (error) {
    const createProdErr = error.response.data.message;

    dispatch({
      type: CREATE_PRODUCT_ERROR
    });

    toastr.error(createProdErr);
  }
};

// Get single product via productID
export const getProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/products/${productId}`);

    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

// List products via /:ShopID
export const listProductByShop = shopId => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/products/by/${shopId}`);

    dispatch({
      type: LIST_PRODUCT_BY_SHOP,
      payload: res.data
    });
  } catch (error) {
    const prodByShopErr = error.response.data.message;

    dispatch({
      type: LIST_PRODUCT_BY_SHOP_ERR
    });

    toastr.error(prodByShopErr);
  }
};

// Update Product
export const updateProduct = (
  shopId,
  productId,
  productData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': `multipart/form-data`
    }
  };

  const data = productData;

  try {
    const res = await axios.put(
      `/api/v1/products/${shopId}/${productId}`,
      data,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data
    });

    history.push(`/seller/shop/edit/${shopId}`);
  } catch (error) {
    const updateProdErr = error.response.data.message;

    dispatch({
      type: UPDATE_PRODUCT_ERROR
    });

    toastr.error(updateProdErr);
  }
};

// Delete a product
export const deleteProduct = (productId, shopId) => async dispatch => {
  try {
    await axios.delete(`/api/v1/products/${shopId}/${productId}`);

    dispatch({
      type: DELETE_PRODUCT,
      payload: productId
    });

    toastr.success('Product successfully deleted.');
  } catch (error) {
    console.log(error.response.data);
  }
};

// List related products
export const listRelated = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/products/related/${productId}`);

    console.log(res.data, 'listRelated');
    dispatch({
      type: LIST_RELATED,
      payload: res.data
    });
  } catch (error) {
    const listRelatedErr = error.response.data.message;

    dispatch({
      type: LIST_RELATED_ERROR
    });

    toastr.error(listRelatedErr);
  }
};

// List Latest Products
export const listLatest = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/products/latest');

    dispatch({
      type: LIST_LATEST,
      payload: res.data
    });
  } catch (error) {
    console.log(error.response);
  }
};

// List Categories
export const listCategories = () => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/products/categories`);

    dispatch({
      type: LIST_CATEGORIES,
      payload: res.data
    });
  } catch (error) {
    console.log(error.response.data.message);
  }
};

// List Search
export const listSearch = params => async dispatch => {
  const query = queryString.stringify(params);
  console.log(query, 'QUERY in listSearch action');

  try {
    const res = await axios.get(`/api/v1/products/?${query}`);

    dispatch({
      type: LIST_SEARCH,
      payload: res.data
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

// List the result of Search
export const listResults = params => async dispatch => {
  const query = queryString.stringify(params);

  try {
    const res = await axios.get(`/api/v1/products/?${query}`);
    console.log(res.data, 'in listResult action');

    dispatch({
      type: LIST_RESULT,
      payload: res.data
    });
  } catch (error) {
    const searchErr = error.response.data.message;

    dispatch({
      type: LIST_RESULT_ERROR
    });

    toastr.error(searchErr);
  }
};
