import React from "react";

import "./cart-item.scss";

const CartItem = ({ imageUrl, price, name, quantity }) => (
  <div className="cart-item">
    <img src={imageUrl} />
    <div className="item-details">
      <span className="name">{name}</span>
      <span price="price">
        {quantity} x ${price}
      </span>
    </div>
  </div>
);

export default CartItem;
