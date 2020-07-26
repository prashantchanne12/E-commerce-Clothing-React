import React from "react";
import { connect } from "react-redux";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { toggleCartHidden } from "../../redux/cart/cart-actions.js";
import { selectCartItemsCount } from "../../redux/cart/cart-selectors.js";

import "./cart-icon.scss";

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count"> {itemCount} </span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

// this method means we are listening to any changes that made to the store.
const mapStateToProps = (state) => ({
  itemCount: selectCartItemsCount(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

/*
To understand this we need to start from reducer



Prerequisite understanding:

1. if reducer return new value (new object), then this mean state change
2. when state change, store will run every mounted component's mapStateToProps

It will rerender every mapStateToProps


I hope this is clear at this point, because it is crucial to explain why memoization is needed

imagine component A has some expensive calculation in its mapStateToProps

const mapState = (state) => {
     return {profit: expensiveCalculation(state.num1,state.num2,state.num3)};
}


now recall what I mentioned earlier: any state change will run all mapStateToProps!


Imagine component B dispatch an action that return new state from reducer, eventhough this state change has nothing to do with component A, store will still use the same state to run component A's mapStateToProps, thus the expensiveCalculation run every single time for no obvious reason!



To prevent this, reselect library help us with memoization

const mapState = (state) => {
     return {profit: selectProfit(state)};
}
when mapStateToProps is called again due to any state update of any other components, Reselect will not run expensive calculation if the input values state.num1, state.num2, state.num3 remain the same with previous run.


With reselect we are memoizing the value of each selector that calls createSelector, as long as the value parameters passed in haven't changed, then our selector won't re-compute and just returned the previously memoized value.
*/
