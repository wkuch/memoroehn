import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "../board/Board";
import Menu from "../menu/Menu";
import oleImages from "../../resources/packOne";
import menschenImages from "../../resources/packTwo";
import autistenImgs from "../../resources/packThree";

class Routing extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="olaf" element={<Board images={oleImages} />} />
          <Route path="menschen" element={<Board images={menschenImages} />} />
          <Route path="autisten" element={<Board images={autistenImgs} />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default Routing;
