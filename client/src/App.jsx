import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Candidates from "./pages/Candidates";
import MatchJobs from "./pages/MatchJobs";
import JobDetails from "./pages/JobDetails";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:title" element={<JobDetails />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/match" element={<MatchJobs />} /> 
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;