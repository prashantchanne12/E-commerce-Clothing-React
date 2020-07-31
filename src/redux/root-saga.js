import { all, call } from 'redux-saga/effects';


import { userSagas } from './user/user-saga';
import { cartSagas } from './cart/cart-saga'
import { shopSagas } from './shop/shop-saga';

export default function* rootSaga() {
    yield all([
        call(shopSagas),
        call(userSagas),
        call(cartSagas),
    ]);
}

// all takes an arrays of SAGAs and calls any numbers of SAGAs inside the array. 