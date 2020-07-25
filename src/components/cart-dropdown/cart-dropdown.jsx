import React from "react";

import CustomButton from "../custom-button/custom-button.jsx";
import "./cart-dropdown.scss";

const CartDropdown = () => (
  <div className="cart-dropdown">
    <div className="cart-items"></div>
    <CustomButton>CHECKOUT</CustomButton>
  </div>
);

export default CartDropdown;
