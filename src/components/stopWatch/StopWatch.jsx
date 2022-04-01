import React, { Component } from "react";

class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
    };
    setInterval(this.increment(), 1000);
  }

  increment() {
    this.setState({ time: this.state.time++ });
  }

  render() {
    return <div>{this.state.time}</div>;
  }
}

export default StopWatch;
