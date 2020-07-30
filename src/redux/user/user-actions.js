// ---------- Google SignIn --------------

export const googleSignInStart = () => ({
    type: 'GOOGLE_SIGNIN_START',
});

// ---------- Email SignIn --------------

export const emailSignInStart = (emailAndPassword) => ({
    type: 'EMAIL_SIGNIN_START',
    payload: emailAndPassword,
});

// --------------- * -------------------

export const signInSuccess = (user) => ({
    type: 'SIGNIN_SUCCESS',
    payload: user,
});

export const signInFailure = (errorMessage) => ({
    type: 'SIGNIN_FAILURE',
    payload: errorMessage,
});

