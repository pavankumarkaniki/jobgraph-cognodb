import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <Link to="/" className="logo">
          JobGraph
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/candidates">Candidates</Link>
          <Link to="/match">Job Matching</Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;