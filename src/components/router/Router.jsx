import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "../board/Board";
import Menu from "../menu/Menu";
import oleImages from "../../resources/packOne";
import menschenImages from "../../resources/packTwo";

class Routing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="olaf" element={<Board images={oleImages} />} />
          <Route path="menschen" element={<Board images={menschenImages} />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default Routing;
