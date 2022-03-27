import React from "react";
import Emoji from "../emoji/Emoji";
import Image from "../image/Image";
import bg from "../../resources/background/bg.jpg";
import "./Tile.css";

const Tile = (props) => {
  return (
    <div className={`tile m-1`}>
      {props.discovered && !props.background && <Emoji symbol={props.symbol} />}
      {!props.discovered && props.background && <Image src={bg} />}
      {props.discovered && props.background && <Image src={props.background} />}
    </div>
  );
};
export default Tile;
