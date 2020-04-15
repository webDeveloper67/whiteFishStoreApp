import {
  ADD_CART_ITEM,
  RENEW_CART_ITEM,
  UPDATE_CART_ITEM,
  REMOVE_CART_ITEM,
  DELETE_ALL_CART_ITEMS
} from './../types';

export const addCartItem = (product, quantity = 1) => {
  let shopId = Object.values(product.shop).map(el => el._id);

  return {
    type: ADD_CART_ITEM,
    payload: { product, quantity, shop: shopId[0] }
  };
};

export const renewCartItem = cartItems => ({
  type: RENEW_CART_ITEM,
  payload: cartItems
});

export const updateCartItem = (itemIndex, quantity) => ({
  type: UPDATE_CART_ITEM,
  payload: ([itemIndex].quantity = quantity)
});

export const removeCartItem = itemIndex => ({
  type: REMOVE_CART_ITEM,
  payload: itemIndex
});

export const deleteAllCartItem = () => ({
  type: DELETE_ALL_CART_ITEMS
});
