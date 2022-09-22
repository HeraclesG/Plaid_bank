import { createStore, combineReducers} from 'redux';
import UserReducer from './reducers/userReducer';
 
const rootReducer = combineReducers({
  user: UserReducer,
});
 
export const store = createStore(rootReducer);