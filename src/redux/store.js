import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';
// Middlewares are the functions that recieves 'Actions' and performs some operations on them and pass them out to the 'Root Reducers'

// Redux Thunk - a peice of middleware that allows us to fire a functions.

import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

// const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
