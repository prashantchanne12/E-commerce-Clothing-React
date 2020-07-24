import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

// Middlewares are the functions that recieves 'Actions' and performs some operations on them and pass them out to the 'Root Reducers'

import rootReducer from './root-reducer';

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
