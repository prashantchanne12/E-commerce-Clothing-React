// ---------- Google SignIn --------------

export const googleSignInStart = () => ({
    type: 'GOOGLE_SIGNIN_START',
});

// ---------- Email SignIn --------------

export const emailSignInStart = (emailAndPassword) => ({
    type: 'EMAIL_SIGNIN_START',
    payload: emailAndPassword,
});

// --------------- SignIn -------------------

export const signInSuccess = (user) => ({
    type: 'SIGNIN_SUCCESS',
    payload: user,
});

export const signInFailure = (errorMessage) => ({
    type: 'SIGNIN_FAILURE',
    payload: errorMessage,
});

// -------------- User Session --------------------

export const checkUserSession = () => ({
    type: 'CHECK_USER_SESSION'
});

// -------------- Sign out --------------------

export const signOutStart = () => ({
    type: 'SIGN_OUT_START'
});

export const signOutSuccess = () => ({
    type: 'SIGN_OUT_SUCCESS'
});

export const signOutFailure = (error) => ({
    type: 'SIGN_OUT_FAILURE',
    payload: error,
});


// -------------- Sign Up ---------------------

export const signUpStart = (userCredentials) => ({
    type: 'SIGN_UP_START',
    payload: userCredentials
});

export const signUpSuccess = ({ user, additionalData }) => ({
    type: 'SIGN_UP_SUCCESS',
    payload: { user, additionalData }
});


export const signUpFailure = (error) => ({
    type: 'SIGN_UP_FAILURE',
    payload: error
});
