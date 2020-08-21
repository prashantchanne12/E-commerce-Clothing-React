import React, { Profiler } from "react";
import Directory from "../../components/directory/directory";
import { HomePageContainer } from "./homepage-styles";

const HomePage = () => {
  return (
    <HomePageContainer>
      <Profiler
        id="Directory"
        onRender={(id, phase, duration) => {
          console.log({ id, phase, duration });
        }}
      >
        <Directory />
      </Profiler>
    </HomePageContainer>
  );
};

export default HomePage;
