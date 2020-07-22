import React from "react";
import "./menu-item.scss";

const MenuItem = ({ title, imageUrl, size }) => (
  <div
    style={{ backgroundImage: `url(${imageUrl})` }}
    className={`${size} menu-item`}
  >
    <h1 className="title">{title}</h1>
    <span className="subtitle">SHOP NOW</span>
  </div>
);

export default MenuItem;
