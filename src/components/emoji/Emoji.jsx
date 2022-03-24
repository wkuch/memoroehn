import React from "react";
import "./Emoji.css";

const Emoji = (props) => (
  <div className="wrapper">
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
    >
      {props.symbol}
    </span>{" "}
  </div>
);
export default Emoji;
