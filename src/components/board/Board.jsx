import React, { Component } from "react";
import Emoji from "../emoji/Emoji";
import Tile from "../tile/Tile";
import "./Board.css";

const width = 5;
const height = 6;
let emojiPool = [
  "🧳",
  "🌂",
  "☂️",
  "🧵",
  "👀",
  "👨‍🌾",
  "🧶",
  "🕶",
  "🥽",
  "🥼",
  "🦺",
  "👔",
  "👕",
  "👖",
  "🥳",
];
class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardData: [[], [], [], [], [], []],
    };
  }

  componentDidMount() {
    let counter = 0;
    let tempBoard = this.state.boardData;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (counter % emojiPool.length == 0) {
          emojiPool = shuffle(emojiPool);
        }
        let currentTileData = {
          emoji: emojiPool[counter % emojiPool.length],
          discovered: true,
        };
        tempBoard[i][j] = currentTileData;
        counter++;
      }
    }
    this.setState({ boardData: tempBoard });
  }

  renderBoardLine(lineArr, rowNo, arr) {
    console.log(arr);
    console.log(lineArr);
    return (
      <div className="is-flex is-flex-direction-row">
        {lineArr.map((tileData, columnNo) => (
          <div>
            <Tile symbol={tileData.emoji} discovered={tileData.discovered} />
          </div>
        ))}
      </div>
    );
  }

  render() {
    if (this.state.boardData[0][0] == undefined) {
      return <div>loading</div>;
    }
    return (
      <div>
        <Tile symbol="😍" discovered={true} />
        <button
          className="button"
          onClick={() => console.log(this.state.boardData)}
        >
          print
        </button>
        {this.state.boardData.map((lineData, rowNo, arr) =>
          this.renderBoardLine(lineData, rowNo, arr)
        )}
      </div>
    );
  }
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
export default Board;
