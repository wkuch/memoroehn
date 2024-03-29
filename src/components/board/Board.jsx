import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tile from "../tile/Tile";
import "./Board.css";
import Icon from "@mdi/react";
import { mdiShareVariant } from "@mdi/js";
import { mdiCog } from "@mdi/js";

const heightNew = 6;
const widthNew = 5;
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
      settingsVisible: false,
      boardData: [[], [], [], [], []],
      openTiles: [],
      foundPairs: 0,
      steps: 0,
      startTime: null,
      runTime: null,
    };
  }

  componentDidMount() {
    let counter = 0;
    let tempBoard = this.state.boardData;

    let visualPool = imageMode ? this.props.images : emojiPool;

    for (let i = 0; i < widthNew; i++) {
      for (let j = 0; j < heightNew; j++) {
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

  handleTileClick(columnPos, rowPos) {
    if (this.state.steps === 0) {
      this.setState({ startTime: new Date() });
    }

    if (
      this.state.boardData[columnPos][rowPos].solved ||
      this.state.openTiles.includes(this.state.boardData[columnPos][rowPos])
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

    newOpenTiles.push(this.state.boardData[columnPos][rowPos]);
    this.setState({
      openTiles: newOpenTiles,
    });
    let temptData = [...this.state.boardData];

    temptData[columnPos][rowPos].timesOpened =
      temptData[columnPos][rowPos].timesOpened + 1;
    this.setState({ steps: this.state.steps + 1 });

    if (
      newOpenTiles.length === 2 &&
      newOpenTiles[0].position !== newOpenTiles[1].position &&
      newOpenTiles[0].visual === newOpenTiles[1].visual
    ) {
      this.setState({ foundPairs: this.state.foundPairs + 1 });
      this.setState({ openTiles: [] });
      temptData[columnPos][rowPos].solved = true;
      temptData[newOpenTiles[0].position[0]][
        newOpenTiles[0].position[1]
      ].solved = true;
      const runTime = new Date() - this.state.startTime;
      this.setState({ runTime });
    }

    temptData[columnPos][rowPos].discovered = true;

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

    let scoreArr = [[], [], [], [], [], []];

    for (let i = 0; i < this.state.boardData.length; i++) {
      for (let j = 0; j < this.state.boardData[i].length; j++) {
        scoreArr[j].push(this.state.boardData[i][j]);
      }
    }

    let scoreString = "🧠 Memoröhn 🧠 \n";
    scoreArr.forEach((lineData) => {
      let lineString = "";
      for (let i = 0; i < lineData.length; i++) {
        if (lineData[i].timesOpened <= 2) {
          lineString = lineString + scoreEmojis[0];
          continue;
        }
        if (lineData[i].timesOpened > 2 && lineData[i].timesOpened < 5) {
          lineString = lineString + scoreEmojis[lineData[i].timesOpened - 2];
        } else {
          lineString = lineString + scoreEmojis[3];
        }
      }
      scoreString = scoreString + lineString + "\n";
    });

    scoreString = scoreString + `💯 Versuche: ${this.state.steps} 💯`;
    scoreString = scoreString + "\n Zeit: ⏱️" + this.renderTimeString() + "⏱️";

    scoreString = scoreString + "\n\n memoröhn.de/" + this.props.url;
    navigator.clipboard.writeText(scoreString);
  }

  renderTimeString() {
    const time = this.state.runTime;
    const ms = time % 1000;
    const s = ((time % 60000) - ms) / 1000;
    const m = Math.floor((time % 3600000) / 60000);

    return `${this.addPadding(m, 2)}:${this.addPadding(s, 2)}:${this.addPadding(
      ms,
      3
    )}`;
  }

  addPadding(number, supposedLength) {
    let numberString = "" + number;
    const numberStringLength = numberString.length;
    for (let i = supposedLength; i > numberStringLength; i--) {
      numberString = "0" + numberString;
    }

    return numberString;
  }

  renderBoardLine(lineArr, rowNo, arr) {
    return (
      <div className="">
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

  renderSettingsModal() {
    return (
      <div>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Einstellungen</p>
          </header>
          <section className="modal-card-body">
            <div>
              <label className="checkbox">-- coming soon --</label>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-success"
              onClick={() => this.handleSettingsClick()}
            >
              Save changes
            </button>
          </footer>
        </div>
      </div>
    );
  }

  renderScoreSection() {
    return (
      <div className="success">
        <div className="is-size-5">Glückwunsch</div>
        <div>
          <div className="is-flex is-flex-direction-row is-justify-content-center mb-2">
            <div className="mr-2">Versuche: {this.state.steps}</div>
            <div>Zeit: {this.renderTimeString()}</div>
          </div>
          <button
            className="button is-primary mb-3"
            onClick={() => this.handleShareClick()}
          >
            <div className="is-flex">
              Share score
              <Icon
                className="ml-2"
                path={mdiShareVariant}
                title="share score"
                size={1}
                horizontal
                vertical
                rotate={180}
                color="black"
              />
            </div>
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
    );
  }

  handleSettingsClick() {
    this.setState({ settingsVisible: !this.state.settingsVisible });
  }

  render() {
    const active = this.state.settingsVisible ? "is-active" : "";
    if (this.state.boardData[0][0] === undefined) {
      return <div>loading</div>;
    }
    return (
      <div className="game has-background-white">
        <div className={`modal ${active}`}>{this.renderSettingsModal()}</div>
        <div className="is-flex is-flex-direction-column header">
          <div
            className="is-align-self-flex-end p-2"
            onClick={() => this.handleSettingsClick()}
          >
            <Icon
              className="ml-2"
              path={mdiCog}
              title="share score"
              size={0.7}
              horizontal
              vertical
              rotate={180}
              color="black"
            />
          </div>
          <div className="is-size-3 is-align-self-center">Memoröhn</div>
        </div>
        <div>
          <div className="board-container">
            <div className="board">
              {this.state.boardData.map((colData, colNo, arr) =>
                this.renderBoardLine(colData, colNo, arr)
              )}
            </div>
          </div>
          {this.state.foundPairs >= (heightNew * widthNew) / 2 &&
            this.renderScoreSection()}
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
