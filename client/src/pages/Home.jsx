import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="hero">
        <div className="hero-content">
          <p className="tag">GRAPH-BASED JOB DISCOVERY</p>

          <h1>
            Find jobs that match
            <span> your skills.</span>
          </h1>

          <p className="hero-text">
            JobGraph connects candidates, skills, jobs and companies
            using graph relationships to find better job matches.
          </p>

          <div className="hero-buttons">
            <Link to="/match" className="primary-button">
              Find Matching Jobs
            </Link>

            <Link to="/jobs" className="secondary-button">
              Explore Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;