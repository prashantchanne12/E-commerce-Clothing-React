import SHOP_DATA from './shop-data.js';


const INITIAL_STATE = {
    collections: SHOP_DATA,
}

const ShopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'UPDATE_COLLECTIONS': {
            return {
                ...state,
                collections: action.payload
            }
        }

        default: {
            return state;
        }
    }
}

export default ShopReducer;