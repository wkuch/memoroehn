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
      openTiles: [],
      foundPairs: 0,
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
          discovered: false,
          solved: false,
          position: [i, j],
        };
        tempBoard[i][j] = currentTileData;
        counter++;
      }
    }
    this.setState({ boardData: tempBoard });
  }

  handleTileClick(rowNo, columnNo) {
    console.log(this.state.openTiles);
    if (
      this.state.boardData[rowNo][columnNo].solved ||
      this.state.openTiles.includes(this.state.boardData[rowNo][columnNo])
    ) {
      return;
    }
    let hasToBeCleared = false;
    if (this.state.openTiles.length >= 2) {
      hasToBeCleared = true;
      this.state.openTiles.map((tile) => {
        tile.discovered = false;
      });
      this.setState({ openTiles: [] });
    }

    let newOpenTiles = hasToBeCleared ? [] : [...this.state.openTiles];

    newOpenTiles.push(this.state.boardData[rowNo][columnNo]);
    this.setState({
      openTiles: newOpenTiles,
    });

    let temptData = [...this.state.boardData];

    if (
      newOpenTiles.length == 2 &&
      newOpenTiles[0].position != newOpenTiles[1].position &&
      newOpenTiles[0].emoji == newOpenTiles[1].emoji
    ) {
      this.setState({ foundPairs: this.state.foundPairs + 1 });
      this.setState({ openTiles: [] });
      temptData[rowNo][columnNo].solved = true;
      temptData[newOpenTiles[0].position[0]][
        newOpenTiles[0].position[1]
      ].solved = true;
    }

    temptData[rowNo][columnNo].discovered = true;
    this.setState({ boardData: temptData });
  }

  renderBoardLine(lineArr, rowNo, arr) {
    return (
      <div className="is-flex is-flex-direction-row">
        {lineArr.map((tileData, columnNo) => (
          <div onClick={() => this.handleTileClick(rowNo, columnNo)}>
            <Tile
              symbol={tileData.emoji}
              discovered={tileData.discovered}
              solved={tileData.solved}
            />
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
      <div className="is-flex is-flex-direction-column is-align-items-center">
        <div className="is-size-3">Röhnory</div>
        <div>
          {this.state.boardData.map((lineData, rowNo, arr) =>
            this.renderBoardLine(lineData, rowNo, arr)
          )}
          {this.state.foundPairs >= (width * height) / 2 && (
            <div className="mt-5 success">
              <div>Glückwunsch</div>
              <Emoji symbol="💩" small />
            </div>
          )}
        </div>
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
