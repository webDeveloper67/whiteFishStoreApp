import { combineReducers } from 'redux';
import { reducer as ToastrReducer } from 'react-redux-toastr';

const rootReducer = combineReducers({
  toastr: ToastrReducer
});

export default rootReducer;
