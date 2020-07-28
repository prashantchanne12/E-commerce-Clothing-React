import React from "react";
import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collection-overview.jsx";
import CollectionPage from "../collection/collection.jsx";

import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop-actions";

import {
  firestore,
  convetCollectionSnapshotToMap,
} from "../../firebase/firebase";

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;

    const collectionRef = firestore.collection("collection");

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        const collectionsMap = convetCollectionSnapshotToMap(snapshot);
        console.log("Dispatch Fired");
        updateCollections(collectionsMap);
      }
    );
  }

  render() {
    const { match } = this.props;

    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
