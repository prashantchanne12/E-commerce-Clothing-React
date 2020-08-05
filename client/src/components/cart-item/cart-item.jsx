import React from "react";

import {
  CartItemConatiner,
  ItemDetailsContainer,
  ImageContainer,
} from "./cart-item-styles";
// import "./cart-item.scss";

const CartItem = ({ imageUrl, price, name, quantity }) => (
  <CartItemConatiner>
    <ImageContainer src={imageUrl} />
    <ItemDetailsContainer>
      <span style={{ fontSize: "16px" }}>{name}</span>
      <span style={{ fontSize: "14px" }}>
        {quantity} x ${price}
      </span>
    </ItemDetailsContainer>
  </CartItemConatiner>
);

export default React.memo(CartItem);
