import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import authRed from './auth';
import shopRed from './shop';
import prodRed from './product';
import userRed from './user';
import cartRed from './cart';
import orderRed from './order';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const rootReducer = combineReducers({
  toastr: ToastrReducer,
  auth: authRed,
  shop: shopRed,
  product: prodRed,
  user: userRed,
  cart: cartRed,
  order: orderRed
});

export default persistReducer(persistConfig, rootReducer);
