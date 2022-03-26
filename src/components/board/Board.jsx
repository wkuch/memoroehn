import React, { Component } from "react";
import Emoji from "../emoji/Emoji";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tile from "../tile/Tile";
import images from "../../resources/packOne";
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
const oneTry = "🟩";
const twoTry = "🟨";
const threeTry = "🟧";
const fourTry = "🟥";

const scoreEmojis = [oneTry, twoTry, threeTry, fourTry];

const imageMode = true;

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardData: [[], [], [], [], [], []],
      openTiles: [],
      foundPairs: 0,
      steps: 0,
    };
  }

  componentDidMount() {
    let counter = 0;
    let tempBoard = this.state.boardData;

    let visualPool = imageMode ? images : emojiPool;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (counter % visualPool.length === 0) {
          visualPool = shuffle(visualPool);
        }
        let currentTileData = {
          visual: visualPool[counter % visualPool.length],
          discovered: false,
          timesOpened: 0,
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
    if (
      this.state.boardData[rowNo][columnNo].solved ||
      this.state.openTiles.includes(this.state.boardData[rowNo][columnNo])
    ) {
      return;
    }
    let hasToBeCleared = false;
    if (this.state.openTiles.length >= 2) {
      hasToBeCleared = true;
      this.state.openTiles.forEach((tile) => {
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

    temptData[rowNo][columnNo].timesOpened =
      temptData[rowNo][columnNo].timesOpened + 1;
    this.setState({ steps: this.state.steps + 1 });

    if (
      newOpenTiles.length === 2 &&
      newOpenTiles[0].position !== newOpenTiles[1].position &&
      newOpenTiles[0].visual === newOpenTiles[1].visual
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

  handleShareClick() {
    toast.success("Score in die Zwischenablage gespeichert!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log(scoreEmojis);
    let scoreString = "🧠 Memoröhn 🧠 \n";
    this.state.boardData.forEach((lineData) => {
      let lineString = "";
      for (let i = 0; i < lineData.length; i++) {
        if (lineData[i].timesOpened <= 2) {
          lineString = lineString + scoreEmojis[0];
          continue;
        }
        if (lineData[i].timesOpened > 2 && lineData[i].timesOpened < 5) {
          lineString = lineString + scoreEmojis[lineData[i].timesOpened - 2];
        } else {
          console.log("over 5");
          console.log(scoreEmojis);
          lineString = lineString + scoreEmojis[3];
        }
      }
      scoreString = scoreString + lineString + "\n";
    });

    scoreString = scoreString + `💯 Versuche: ${this.state.steps} 💯`;

    navigator.clipboard.writeText(scoreString);
  }

  renderBoardLine(lineArr, rowNo, arr) {
    return (
      <div className="line">
        {lineArr.map((tileData, columnNo) => (
          <div onClick={() => this.handleTileClick(rowNo, columnNo)}>
            <Tile
              symbol={imageMode ? null : tileData.visual}
              background={imageMode ? tileData.visual : null}
              discovered={tileData.discovered}
              solved={tileData.solved}
            />
          </div>
        ))}
      </div>
    );
  }

  render() {
    if (this.state.boardData[0][0] === undefined) {
      return <div>loading</div>;
    }
    return (
      <div className="board has-background-white">
        <div className="header ">Memoröhn</div>
        <div>
          {this.state.boardData.map((lineData, rowNo, arr) =>
            this.renderBoardLine(lineData, rowNo, arr)
          )}
          {this.state.foundPairs >= (width * height) / 2 && (
            <div className="success">
              <div>Glückwunsch</div>
              <div>
                <Emoji symbol="💩" small />
                <button className="btn" onClick={() => this.handleShareClick()}>
                  share score <i className="fa fa-home"></i>
                </button>
                <ToastContainer
                  position="bottom-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </div>
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
