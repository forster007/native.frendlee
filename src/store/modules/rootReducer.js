import { combineReducers } from 'redux';
import auth from './auth/reducer';
import websocket from './websocket/reducer';

export default combineReducers({
  auth,
  websocket,
});
