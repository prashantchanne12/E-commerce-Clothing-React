import React from "react";

import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart-selectors.js";

import CustomButton from "../custom-button/custom-button.jsx";
import CartItem from "../cart-item/cart-item.jsx";
// import "./cart-dropdown.scss";
import {
  CartDropdownContainer,
  CartItemsContainer,
  EmptyMsgContainer,
} from "./cart-dropdown-styles";

import { toggleCartHidden } from "../../redux/cart/cart-actions";

import { withRouter } from "react-router-dom";

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <CartDropdownContainer>
    <CartItemsContainer>
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} {...cartItem} />
        ))
      ) : (
        <EmptyMsgContainer>Your cart is empty</EmptyMsgContainer>
      )}
    </CartItemsContainer>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      CHECKOUT
    </CustomButton>
  </CartDropdownContainer>
);

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
});

export default withRouter(connect(mapStateToProps, null)(CartDropdown));
