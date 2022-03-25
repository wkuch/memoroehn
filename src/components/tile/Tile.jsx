import React from "react";
import Emoji from "../emoji/Emoji";
import "./Tile.css";

const Tile = (props) => {
  return (
    <div
      className={`tile ${props.discovered && "open"} ${
        props.solved && "solved"
      }`}
    >
      {props.discovered && <Emoji symbol={props.symbol} />}
    </div>
  );
};
export default Tile;
