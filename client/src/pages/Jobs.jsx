import React, { Component } from "react";
import { getJobs } from "../api";
import JobCard from "../components/JobCard";
import Loading from "../components/Loading";

class Jobs extends Component {
  state = {
    jobs: [],
    loading: true,
    error: "",
  };

  componentDidMount() {
    this.loadJobs();
  }

  loadJobs = async () => {
    try {
      const jobs = await getJobs();

      this.setState({
        jobs,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: "Unable to load jobs. Please try again.",
        loading: false,
      });
    }
  };

  render() {
    const { jobs, loading, error } = this.state;

    return (
      <div className="page">
        <div className="page-header">
          <div>
            <p className="tag">OPPORTUNITIES</p>
            <h1>Explore Jobs</h1>
            <p>Discover available opportunities from our companies.</p>
          </div>
        </div>

        {loading && <Loading />}

        {error && (
          <div className="error-box">
            {error}
            <button onClick={this.loadJobs}>Retry</button>
          </div>
        )}

        {!loading && !error && jobs.length === 0 && (
          <div className="empty-box">
            No jobs available right now.
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

export default Jobs;