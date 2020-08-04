import React from "react";
import { withRouter } from "react-router-dom";
// import "./menu-item.scss";

import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  ContentTitle,
  ContentSubtitle,
} from "./menu-item-style";

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => {
  // console.log(match);
  return (
    <MenuItemContainer
      className={`${size} menu-item`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <BackgroundImageContainer
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <ContentContainer className="content">
        <ContentTitle>{title.toUpperCase()}</ContentTitle>
        <ContentSubtitle>SHOP NOW</ContentSubtitle>
      </ContentContainer>
    </MenuItemContainer>
  );
};

export default withRouter(MenuItem); // Higher Order Component
// Higher Order Component is function that takes another component as an argument and transforms it into another component and returns that transformed component whoch has access to history, match, location.
