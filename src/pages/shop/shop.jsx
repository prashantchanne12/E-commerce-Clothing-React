import React from "react";
import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collection-overview.jsx";
import CollectionPage from "../collection/collection.jsx";

import { connect } from "react-redux";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop-actions";
import {
  selectIsCollectionFetching,
  isCollectionLoaded,
} from "../../redux/shop/shop-selectors";

import WithSpinner from "../../components/spinner/spinner";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
    // fetch(
    //   "https://firestore.googleapis.com/v1/projects/clothing-e-commerce-6758e/databases/(default)/documents/collection "
    // )
    //   .then((response) => response.json())
    //   .then((collections) => console.log(collections));
  }

  render() {
    const { match, isFetching, isCollectionLoaded } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={isFetching} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner
              isLoading={!isCollectionLoaded}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

// props in render - are the parameters that our components are going to recieve ex. history, match etc.

const mapStateToProps = (state) => ({
  isFetching: selectIsCollectionFetching(state),
  isCollectionLoaded: isCollectionLoaded(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

// the point of using an HOC is to abstract common functionality to a separate component so that we can re-use it and not repeat ourselves.

// It's to inject common functionality into other components without repeatedly making different components that do the same thing.
