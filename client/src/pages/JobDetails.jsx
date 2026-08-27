import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getJobDetails } from "../api";
import Loading from "../components/Loading";
import withRouter from "../components/withRouter";

class JobDetails extends Component {
  state = {
    job: null,
    loading: true,
    error: "",
  };

  componentDidMount() {
    this.loadJob();
  }

  loadJob = async () => {
    try {
      const job = await getJobDetails(
        this.props.params.title
      );

      this.setState({
        job,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: "Unable to load job details.",
        loading: false,
      });
    }
  };

  render() {
    const { job, loading, error } = this.state;

    if (loading) {
      return (
        <div className="page">
          <Loading />
        </div>
      );
    }

    if (error) {
      return (
        <div className="page">
          <div className="error-box">
            {error}
          </div>
        </div>
      );
    }

    return (
      <div className="page">
        <Link to="/jobs" className="back-button">
          ← Back to Jobs
        </Link>

        <div className="job-details">
          <div className="job-details-header">
            <div>
              <p className="tag">JOB OPPORTUNITY</p>

              <h1>{job.title}</h1>

              <p className="details-company">
                {job.company}
              </p>
            </div>

            <div className="job-location">
              📍 {job.location}
            </div>
          </div>

          <div className="details-grid">
            <div className="details-section">
              <h2>Job Information</h2>

              <div className="detail-row">
                <span>Experience</span>
                <strong>{job.experience}</strong>
              </div>

              <div className="detail-row">
                <span>Location</span>
                <strong>{job.location}</strong>
              </div>

              <div className="detail-row">
                <span>Company</span>
                <strong>{job.company}</strong>
              </div>
            </div>

            <div className="details-section">
              <h2>Required Skills</h2>

              <div className="skills large-skills">
                {job.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="details-footer">
            <Link to="/match" className="primary-button">
              Find Matching Candidates
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(JobDetails);