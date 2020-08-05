import React from "react";
import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText,
} from "./error-boundry-styles";

class ErrorBoundry extends React.Component {
  constructor() {
    super();

    this.state = {
      hasError: false,
    };
  }

  // runs in the process of rendering
  static getDerivedStateFromError(error) {
    // procees the error
    return { hasError: true };
  }

  // Runs after app is rendered
  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/A040Lxr.png" />
          <ErrorImageText>This Page is Lost in Space</ErrorImageText>
        </ErrorImageOverlay>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundry;
