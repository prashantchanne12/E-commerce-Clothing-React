import React, { useEffect, lazy, Suspense } from "react";
import { Route } from "react-router-dom";

// import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview-container";
// import CollectionContainer from "../collection/collection-container";

import { connect } from "react-redux";
import { fetchCollectionsStart } from "../../redux/shop/shop-actions";
import Spinner from "../../components/spinner/spinner-component";

const CollectionsOverviewContainer = lazy(() =>
  import("../../components/collections-overview/collections-overview-container")
);
const CollectionContainer = lazy(() =>
  import("../collection/collection-container")
);

const ShopPage = ({ match, fetchCollectionsStart }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionContainer}
        />
      </Suspense>
    </div>
  );
};

// props in render - are the parameters that our components are going to recieve ex. history, match etc.

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);

// the point of using an HOC is to abstract common functionality to a separate component so that we can re-use it and not repeat ourselves.

// It's to inject common functionality into other components without repeatedly making different components that do the same thing.
