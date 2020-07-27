// Root Reducer represents the all of the state of our application
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// localStorage object on our window object 
import storage from 'redux-persist/lib/storage';

import UserReducer from './user/user-reducer.js';
import CartReducer from './cart/cart-reducer.js';
import DirectoryReducer from './directory/director-reducer.js';
import ShopReducer from './shop/shop-reducer.js';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: UserReducer,
    cart: CartReducer,
    directory: DirectoryReducer,
    shop: ShopReducer,
});

// modified version of RootReducer with persistance
export default persistReducer(persistConfig, rootReducer);