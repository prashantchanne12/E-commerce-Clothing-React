import React from "react";

import "./collection.scss";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop-selectors.js";
import CollectionItem from "../../components/collection-item/collection-item.jsx";

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// ownProps - props of our component
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps, null)(CollectionPage);
