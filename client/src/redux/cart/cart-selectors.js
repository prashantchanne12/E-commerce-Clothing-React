import { createSelector } from 'reselect';


// ------ INPUT SELECTOR ---------

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0),
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0),
);

/*
reselect allows us to write these selectors in such a way so that it knows that if the properties that it's pulling from the state and using are the same in the sense that their value hasn't changed and the output of the selector is not different then it won't actually pass them into our component it'll just pass the old value and React component will know not to re render. */