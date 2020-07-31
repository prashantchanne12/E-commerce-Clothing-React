// GOOGLE_SIGNIN_START
// GOOGLE_SIGNIN_SUCCESS
// GOOGLE_SIGNIN_FAILURE

// EMAIL_SIGNIN_START
// EMAIL_SIGNIN_SUCCESS
// EMAIL_SIGNIN_FAILURE

import { takeLatest, put, all, call } from 'redux-saga/effects';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase';

import { signInSuccess, signInFailure } from './user-actions'

export function* getSnapshotFromUserAuth(user) {
    try {
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFailure(error.message));

    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);

    } catch (error) {
        yield put(signInFailure(error.message));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);

    } catch (error) {
        yield put(signInFailure(error.message));
    }
}

export function* isUserAuthenticated() {
    try {
        const user = yield getCurrentUser();
        if (!user) return;
        yield getSnapshotFromUserAuth(user);

    } catch (error) {
        put(signInFailure(error.message));
    }
}


export function* onGoogleSignInStart() {
    yield takeLatest('GOOGLE_SIGNIN_START', signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest('EMAIL_SIGNIN_START', signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest('CHECK_USER_SESSION', isUserAuthenticated);
}

export function* userSagas() {
    yield all(
        [
            call(onGoogleSignInStart),
            call(onEmailSignInStart),
            call(onCheckUserSession),
        ]
    )
}