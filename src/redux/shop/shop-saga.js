// takeEvery - Listening For Every Specific Actions
// call - To call any external functions
// put - Similar to dispatch

import { call, put, takeLatest } from 'redux-saga/effects';
import { firestore, convetCollectionSnapshotToMap } from '../../firebase/firebase';

import { fetchCollectionSuccess, fetchCollectionsFailure } from './shop-actions'

// Functions pauses whenever we hit yield until we call next(), then our function continues

// redux-saga middleware runs all sagas concurrently

// all sagas runs on async thread

// -------- SAGA ---------

export function* fetchCollectionAsync() {
    yield console.log('SAGA FIRED');

    try {
        const collectionRef = firestore.collection("collection");

        // Async call goes to the collectionRef.get()
        const snapshot = yield collectionRef.get();

        const collectionsMap = yield call(convetCollectionSnapshotToMap, snapshot);
        // dispatching actions object
        yield put(fetchCollectionSuccess(collectionsMap))

    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }


    // collectionRef
    //     .get()
    //     .then((snapshot) => {
    //         const collectionsMap = convetCollectionSnapshotToMap(snapshot);

    //         dispatch(fetchCollectionSuccess(collectionsMap));
    //     }).catch(error => {
    //         dispatch(fetchCollectionsFailure(error.message));
    //     });
}

export function* fetchCollectionsStart() {
    yield takeLatest('FETCH_COLLECTION_START', fetchCollectionAsync)
}