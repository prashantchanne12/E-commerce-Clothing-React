// Root Reducer represents the all of the state of our application
import { combineReducers } from 'redux';

import UserReducer from './user/user-reducer.js';
import CartReducer from './cart/cart-reducer.js';

// combineReducers is our Root-Reducer
export default combineReducers({
    user: UserReducer,
    cart: CartReducer,
});