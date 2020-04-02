import { combineReducers } from 'redux';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import authRed from './auth';

const rootReducer = combineReducers({
  toastr: ToastrReducer,
  auth: authRed
});

export default rootReducer;
