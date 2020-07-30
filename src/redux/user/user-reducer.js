// state - previous state or initial state 
// when it first fires userReducer the state will be empty that's we have to pass some initial value as default parameter to 'state'

// action - object which contains 'type' and 'payload'

// import UserActionTypes from './user-actions.js';

const INIT_STATE = {
    currentUser: null,
    error: null
}

const UserReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'SIGNIN_SUCCESS': {
            return {
                ...state,
                currentUser: action.payload, // modify this value and return new object so React can detect changes
                error: null,
            }
        }

        case 'SIGNIN_FAILURE': {
            return {
                ...state,
                error: action.payload,

            }
        }

        default: {
            return state;
        }
    }
}

export default UserReducer;
