import { combineReducers } from 'redux';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import authRed from './auth';
import shopRed from './shop';

const rootReducer = combineReducers({
  toastr: ToastrReducer,
  auth: authRed,
  shop: shopRed
});

export default rootReducer;
