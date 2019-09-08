import React from "react";
import * as FontAwesome from "react-icons/fa";
import * as Devicons from "react-icons/di";
import * as Ionicons from "react-icons/io";

import "./tags.css";
import { Link } from "gatsby";

const TechTag = props => {
  const { tag, tech, name, size, color } = props;
  const mapping = {
    Fa: FontAwesome,
    Di: Devicons,
    Io: Ionicons,
  };

  let icon = "";
  try {
    const pack = mapping[name.slice(0, 2)];
    icon = React.createElement(pack[name]);
  } catch (e) {
    console.error(name, "did not exist in icon packs.", e);
  }

  return (
    <div className="d-inline-block p-1">
      <Link to={`/tags/${tag}/`}>
        <button className="tech-tag text-white">
          <p className="d-inline">{tech} </p>
          <div className="d-inline" style={{ fontSize: size, color: color }}>
            {icon}
          </div>
        </button>
      </Link>
    </div>
  );
};

export default TechTag;
