import React from "react";

import { connect } from "react-redux";

import CustomButton from "../custom-button/custom-button.jsx";
import CartItem from "../cart-item/cart-item.jsx";
import "./cart-dropdown.scss";

const CartDropdown = ({ cartItems }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.map((cartItem) => (
        <CartItem key={cartItem.id} {...cartItem} />
      ))}
    </div>
    <CustomButton>CHECKOUT</CustomButton>
  </div>
);

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps, null)(CartDropdown);
