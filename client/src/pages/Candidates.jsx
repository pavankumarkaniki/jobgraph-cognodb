import React, { Component } from "react";

class Candidates extends Component {
  state = {
    candidates: [
      {
        name: "Pavan",
        skills: ["JavaScript", "React", "Node.js", "MySQL", "Git"],
      },
      {
        name: "Rahul",
        skills: ["JavaScript", "HTML", "CSS"],
      },
      {
        name: "Anjali",
        skills: ["JavaScript", "React", "TypeScript"],
      },
    ],
  };

  render() {
    return (
      <div className="page">
        <p className="tag">TALENT</p>
        <h1>Candidates</h1>
        <p>Explore candidate skill profiles.</p>

        <div className="candidate-grid">
          {this.state.candidates.map((candidate) => (
            <div className="candidate-card" key={candidate.name}>
              <div className="avatar">
                {candidate.name.charAt(0)}
              </div>

              <h3>{candidate.name}</h3>

              <div className="skills">
                {candidate.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Candidates;