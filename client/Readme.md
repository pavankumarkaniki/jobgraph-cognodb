# JobGraph – Graph-Based Job Matching Application

JobGraph is a full-stack web application that uses a graph database to
connect jobs, companies, candidates, and skills.

The application allows users to:

- Explore available job opportunities
- View detailed information about a job
- Browse candidates and their skills
- Find candidates whose skills match a job
- Explore relationships between jobs, companies, candidates, and skills

---

## Live Application

### Frontend

https://jobgraph-app.onrender.com

### Backend API

https://jobgraph-api.onrender.com

### GitHub Repository

https://github.com/pavankumarkaniki/jobgraph-cognodb.git

---

# 1. Problem Statement

Traditional job-search applications commonly store jobs, candidates,
companies, and skills in separate relational tables.

However, job matching is primarily a relationship problem.

For example:

- Which candidates have the skills required by a job?
- Which skills are shared by multiple candidates?
- Which jobs require a particular skill?
- Which company posted a particular job?
- Which candidates match multiple skills required by a job?

These questions involve relationships between multiple entities.

JobGraph models these relationships directly using a graph database.

---

# 2. Why a Graph Database?

CognoDB was selected because the core functionality of this application
depends on relationships between entities.

The main graph consists of:

Candidate → Skill → Job → Company

For example:

Candidate
   |
   | HAS_SKILL
   ↓
Skill
   ↑
   | REQUIRES
   |
Job
   |
   | POSTED
   ↓
Company

In a relational database, this structure would normally require several
tables and JOIN operations.

For example:

- candidates
- skills
- candidate_skills
- jobs
- job_skills
- companies

Finding candidates matching a job would require joining several tables.

In a graph database, these relationships are represented directly as
relationships between nodes.

This makes multi-hop relationship queries easier to express using Cypher.

---

# 3. Technology Stack

## Frontend

- React
- JSX
- React Router
- Axios
- CSS
- Responsive design

## Backend

- Node.js
- Express.js
- Axios
- Neo4j JavaScript Driver

## Database

- CognoDB
- openCypher
- Bolt protocol

## Deployment

- Render
- GitHub

---

# 4. Architecture

```text
                    ┌─────────────────┐
                    │  React Frontend │
                    │                 │
                    │ Jobs             │
                    │ Job Details      │
                    │ Candidates       │
                    │ Job Matching     │
                    └────────┬────────┘
                             │
                             │ HTTP / REST API
                             ↓
                    ┌─────────────────┐
                    │ Express Backend │
                    │                 │
                    │ API Routes      │
                    │ Error Handling  │
                    │ Cypher Queries  │
                    └────────┬────────┘
                             │
                             │ Neo4j Driver
                             ↓
                    ┌─────────────────┐
                    │     CognoDB     │
                    │                 │
                    │ Nodes           │
                    │ Relationships  │
                    │ Properties      │
                    └─────────────────┘