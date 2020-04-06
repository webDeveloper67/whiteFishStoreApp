import { combineReducers } from 'redux';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import authRed from './auth';
import shopRed from './shop';
import prodRed from './product';

const rootReducer = combineReducers({
  toastr: ToastrReducer,
  auth: authRed,
  shop: shopRed,
  product: prodRed
});

export default rootReducer;
