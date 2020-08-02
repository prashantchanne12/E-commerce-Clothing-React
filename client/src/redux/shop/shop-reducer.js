const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: '',
}

const ShopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'FETCH_COLLECTION_START': {
            return {
                ...state,
                isFetching: true,
            }
        }

        case 'FETCH_COLLECTION_SUCCESS': {
            return {
                ...state,
                isFetching: false,
                collections: action.payload,
            }
        }

        case 'FETCH_COLLECTION_FAILURE': {
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        }

        default: {
            return state;
        }
    }
}

export default ShopReducer;