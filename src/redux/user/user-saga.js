// GOOGLE_SIGNIN_START
// GOOGLE_SIGNIN_SUCCESS
// GOOGLE_SIGNIN_FAILURE

// EMAIL_SIGNIN_START
// EMAIL_SIGNIN_SUCCESS
// EMAIL_SIGNIN_FAILURE

import { takeLatest, put, all, call } from 'redux-saga/effects';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase';

import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from './user-actions'

export function* getSnapshotFromUserAuth(user, dName) {
    try {
        const userRef = yield call(createUserProfileDocument, user, dName);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFailure(error.message));

    }
}

export function* signInWithGoogle() {
    try {
        yield console.log('gooooooogle')
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

export function* signOut() {
    try {
        auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error.message));
    }
}

export function* signUp({ payload: { email, password, dName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: { dName } }))
    } catch (error) {
        yield put(signUpFailure(error.message));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUserAuth(user, additionalData);
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

export function* onUserSignOutStart() {
    yield takeLatest('SIGN_OUT_START', signOut);
}

export function* onUserSignUpStart() {
    yield takeLatest('SIGN_UP_START', signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest('SIGN_UP_SUCCESS', signInAfterSignUp);
}

export function* userSagas() {
    yield all(
        [
            call(onGoogleSignInStart),
            call(onEmailSignInStart),
            call(onCheckUserSession),
            call(onUserSignOutStart),
            call(onUserSignUpStart),
            call(onSignUpSuccess),
        ]
    )
}