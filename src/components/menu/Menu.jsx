import React, { Component } from "react";
import { Link } from "react-router-dom";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container is-flex is-flex-direction-column is-align-items-center">
        <div className="mt-6">Menü</div>
        <Link to="/olaf" className="button my-4">
          Tölgeröhn
        </Link>
        <Link to="/menschen" className="button">
          Menschensalat
        </Link>
      </div>
    );
  }
}

export default Menu;
