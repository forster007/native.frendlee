import { combineReducers } from 'redux';

import auth from './auth/reducer';
import providers from './providers/reducer';

export default combineReducers({
  auth,
  providers,
});
