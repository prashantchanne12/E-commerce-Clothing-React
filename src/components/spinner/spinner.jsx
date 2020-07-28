import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./spinner-styles";

const Spinner = (WrapperdComponent) => ({ isLoding, ...otherProps }) => {
  return isLoding ? (
    <SpinnerOverlay>
      <SpinnerContainer></SpinnerContainer>
    </SpinnerOverlay>
  ) : (
    <WrapperdComponent {...otherProps} />
  );
};

export default Spinner;
