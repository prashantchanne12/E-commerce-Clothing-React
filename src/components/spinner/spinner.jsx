import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./spinner-styles";

const WithSpinner = (WrapperdComponent) => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer></SpinnerContainer>
      </SpinnerOverlay>
    ) : (
      <WrapperdComponent {...otherProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;
