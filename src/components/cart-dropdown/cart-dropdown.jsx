import React from "react";

import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart-selectors.js";

import CustomButton from "../custom-button/custom-button.jsx";
import CartItem from "../cart-item/cart-item.jsx";
import "./cart-dropdown.scss";

import { toggleCartHidden } from "../../redux/cart/cart-actions";

import { withRouter } from "react-router-dom";

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} {...cartItem} />
        ))
      ) : (
        <span className="empty-msg">Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
});

export default withRouter(connect(mapStateToProps, null)(CartDropdown));
