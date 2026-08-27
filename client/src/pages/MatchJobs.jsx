import React, { Component } from "react";
import { getMatchedJobs } from "../api";
import JobCard from "../components/JobCard";
import Loading from "../components/Loading";

class MatchJobs extends Component {
  state = {
    candidate: "Pavan",
    jobs: [],
    loading: false,
    error: "",
  };

  handleChange = (event) => {
    this.setState({
      candidate: event.target.value,
      jobs: [],
      error: "",
    });
  };

  findJobs = async () => {
    const { candidate } = this.state;

    this.setState({
      loading: true,
      error: "",
    });

    try {
      const jobs = await getMatchedJobs(candidate);

      this.setState({
        jobs,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: "Unable to find matching jobs.",
        loading: false,
      });
    }
  };

  render() {
    const { candidate, jobs, loading, error } = this.state;

    return (
      <div className="page">
        <p className="tag">SMART MATCHING</p>

        <h1>Find Your Best Jobs</h1>

        <p>
          Select a candidate and discover jobs based on connected skills.
        </p>

        <div className="match-panel">
          <label>Select Candidate</label>

          <select value={candidate} onChange={this.handleChange}>
            <option value="Pavan">Pavan</option>
            <option value="Rahul">Rahul</option>
            <option value="Anjali">Anjali</option>
          </select>

          <button className="primary-button" onClick={this.findJobs}>
            Find Matching Jobs
          </button>
        </div>

        {loading && <Loading />}

        {error && <div className="error-box">{error}</div>}

        {!loading && !error && jobs.length === 0 && (
          <div className="empty-box">
            Click "Find Matching Jobs" to see recommendations.
          </div>
        )}

        <div className="jobs-grid">
          {jobs.map((job) => (
            <JobCard key={job.title} job={job} />
          ))}
        </div>
      </div>
    );
  }
}

export default MatchJobs;