import React from "react";
import { Route } from "react-router-dom";

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview-container";
import CollectionContainer from "../collection/collection-container";

import { connect } from "react-redux";
import { fetchCollectionsStart } from "../../redux/shop/shop-actions";

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
    // fetch(
    //   "https://firestore.googleapis.com/v1/projects/clothing-e-commerce-6758e/databases/(default)/documents/collection "
    // )
    //   .then((response) => response.json())
    //   .then((collections) => console.log(collections));
  }

  render() {
    const { match } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionContainer}
        />
      </div>
    );
  }
}

// props in render - are the parameters that our components are going to recieve ex. history, match etc.

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);

// the point of using an HOC is to abstract common functionality to a separate component so that we can re-use it and not repeat ourselves.

// It's to inject common functionality into other components without repeatedly making different components that do the same thing.
