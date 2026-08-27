import React, { Component } from "react";
import { Link } from "react-router-dom";

class JobCard extends Component {
  render() {
    const { job } = this.props;

    return (
      <div className="job-card">
        <div>
          <h3>{job.title}</h3>
          <p className="company">{job.company}</p>

          <div className="job-info">
            <span>{job.location}</span>
            <span>{job.experience}</span>
          </div>

          {job.matchedSkills !== undefined && (
            <p className="match">
              {job.matchedSkills} matching skills
            </p>
          )}
        </div>

        <Link
          to={`/jobs/${encodeURIComponent(job.title)}`}
          className="view-button"
        >
          View Job
        </Link>
      </div>
    );
  }
}

export default JobCard;