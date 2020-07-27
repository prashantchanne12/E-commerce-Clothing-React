import React from "react";
import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collection-overview.jsx";
import CollectionPage from "../collection/collection.jsx";

const ShopPage = ({ match }) => {
  // console.log(match); // match.path = /shops
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  );
};

export default ShopPage;
