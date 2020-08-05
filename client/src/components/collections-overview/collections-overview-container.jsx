import { connect } from "react-redux";
import { selectIsCollectionFetching } from "../../redux/shop/shop-selectors";
import { compose } from "redux";
import WithSpinner from "../with-spinner/spinner";
import CollectionsOverview from "./collection-overview";

const mapStateToProps = (state) => ({
  isLoading: selectIsCollectionFetching(state),
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps, null),
  WithSpinner
)(CollectionsOverview);

// CollectionOverview -> Spinner -> Connect

export default CollectionsOverviewContainer;

// Container Pattern just passes down props to the component
