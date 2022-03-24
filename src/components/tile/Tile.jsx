import React from "react";
import Emoji from "../emoji/Emoji";
import "./Tile.css";

const Tile = (props) => {
  return (
    <div className="tile m-1">
      {props.discovered && <Emoji symbol={props.symbol} />}
    </div>
  );
};
export default Tile;
