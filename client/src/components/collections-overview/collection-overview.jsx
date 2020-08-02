import React from "react";
import { connect } from "react-redux";
import { selectCollectionsPreview } from "../../redux/shop/shop-selectors";
import CollectionPreview from "../collection-preview/collection-preview.jsx";

import "./collection-overview.scss";

const CollectionsOverview = ({ collections }) => (
  <div className="collections-overview">
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);

const mapStateToProps = (state) => ({
  collections: selectCollectionsPreview(state),
});

export default connect(mapStateToProps)(CollectionsOverview);
