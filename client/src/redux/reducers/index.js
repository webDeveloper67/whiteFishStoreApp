import { combineReducers } from 'redux';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import authRed from './auth';
import shopRed from './shop';
import prodRed from './product';
import userRed from './user';

const rootReducer = combineReducers({
  toastr: ToastrReducer,
  auth: authRed,
  shop: shopRed,
  product: prodRed,
  user: userRed
});

export default rootReducer;
