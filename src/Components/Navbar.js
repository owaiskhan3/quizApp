import React, { Component } from "react";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            Quiz App
          </a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
