import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop-saga'

import { userSagas } from './user/user-saga';

export default function* rootSaga() {
    yield all([
        call(fetchCollectionsStart),
        call(userSagas),
    ]);
}

// all takes an arrays of SAGAs and calls any numbers of SAGAs inside the array. 