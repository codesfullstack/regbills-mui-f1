import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import authReducer from './authReducer';
import todosReducer from './todosReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  todos: todosReducer,
});
export default rootReducer;
