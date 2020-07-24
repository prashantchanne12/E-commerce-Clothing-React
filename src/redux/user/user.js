// state - previous state or initial state 
// when it first fires userReducer the state will be empty that's we have to pass some initial value as default parameter to 'state'

// action - object which contains 'type' and 'payload'


const INIT_STATE = {
    currentUser: null
}

const UserReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER': {
            return {
                ...state,
                currentUser: action.payload, // modify this value and return new object so React can detec changes
            }
        }

        default: {
            return state;
        }
    }
}

export default UserReducer;
