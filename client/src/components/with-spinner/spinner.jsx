import React from "react";
// import { SpinnerContainer, SpinnerOverlay } from "./spinner-styles";
import Spinner from "../spinner/spinner-component";

const WithSpinner = (WrapperdComponent) => ({ isLoading, ...otherProps }) => {
  return isLoading ? <Spinner /> : <WrapperdComponent {...otherProps} />;
};

export default WithSpinner;
