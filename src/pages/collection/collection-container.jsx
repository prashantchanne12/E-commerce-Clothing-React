import { connect } from "react-redux";
import { compose } from "redux";
import { isCollectionLoaded } from "../../redux/shop/shop-selectors";
import WithSpinner from "../../components/spinner/spinner";
import CollectionPage from "../collection/collection";

const mapStateToProps = (state) => ({
  isLoading: !isCollectionLoaded(state),
});

const CollectionContainer = compose(
  connect(mapStateToProps, null),
  WithSpinner
)(CollectionPage);

export default CollectionContainer;
