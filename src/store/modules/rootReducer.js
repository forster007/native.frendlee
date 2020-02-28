import { combineReducers } from 'redux';
import appointments from './appointments/reducer';
import auth from './auth/reducer';
import providers from './providers/reducer';

export default combineReducers({
  appointments,
  auth,
  providers,
});
