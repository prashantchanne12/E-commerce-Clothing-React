import React from "react";
import MenuItem from "../menu-item/menu-item";
import "./directory.scss";

import { connect } from "react-redux";
import { selectDirectorySections } from "../../redux/directory/directory-selectors.js";

const Directory = ({ sections }) => (
  <div className="directory-menu">
    {sections.map(({ id, ...sectionProps }) => (
      <MenuItem key={id} {...sectionProps} />
    ))}
  </div>
);

const mapStateToProps = (state) => ({
  sections: selectDirectorySections(state),
});

export default connect(mapStateToProps)(Directory);
