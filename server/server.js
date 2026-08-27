const express = require("express");
const cors = require("cors");
const driver = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

// Test database
app.get("/", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(
      "RETURN 'CognoDB Connected!' AS message"
    );

    res.json({
      message: result.records[0].get("message"),
    });
  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      error: "Database connection failed",
    });
  } finally {
    await session.close();
  }
});

// Get all jobs
app.get("/api/jobs", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (j:Job)-[:POSTED_BY]->(c:Company)
      RETURN
        j.title AS title,
        j.experience AS experience,
        j.location AS location,
        c.name AS company
      ORDER BY j.title
    `);

    const jobs = result.records.map((record) => ({
      title: record.get("title"),
      experience: record.get("experience"),
      location: record.get("location"),
      company: record.get("company"),
    }));

    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);

    res.status(500).json({
      error: "Failed to fetch jobs",
    });
  } finally {
    await session.close();
  }
});

// Match jobs with candidate skills
app.get("/api/jobs/match/:candidateName", async (req, res) => {
  const session = driver.session();
  const { candidateName } = req.params;

  try {
    const result = await session.run(
      `
      MATCH (c:Candidate {name: $candidateName})-[:HAS_SKILL]->(s:Skill)
            <-[:REQUIRES]-(j:Job)
            -[:POSTED_BY]->(company:Company)

      RETURN
        j.title AS title,
        j.experience AS experience,
        j.location AS location,
        company.name AS company,
        count(s) AS matchedSkills

      ORDER BY matchedSkills DESC
      `,
      { candidateName }
    );

    const jobs = result.records.map((record) => ({
      title: record.get("title"),
      experience: record.get("experience"),
      location: record.get("location"),
      company: record.get("company"),
      matchedSkills: record.get("matchedSkills").toNumber(),
    }));

    res.json(jobs);
  } catch (error) {
    console.error("Error matching jobs:", error);

    res.status(500).json({
      error: "Failed to match jobs",
    });
  } finally {
    await session.close();
  }
});

app.get("/api/jobs/:title", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (j:Job {title: $title})
      OPTIONAL MATCH (j)-[:REQUIRES]->(skill:Skill)
      OPTIONAL MATCH (c:Company)-[:POSTED]->(j)

      RETURN 
        j.title AS title,
        j.location AS location,
        j.experience AS experience,
        c.name AS company,
        collect(DISTINCT skill.name) AS skills
      `,
      {
        title: req.params.title,
      }
    );

    if (result.records.length === 0) {
      return res.status(404).json({
        error: "Job not found",
      });
    }

    const record = result.records[0];

    res.json({
      title: record.get("title"),
      location: record.get("location"),
      experience: record.get("experience"),
      company: record.get("company"),
      skills: record.get("skills"),
    });
  } catch (error) {
    console.error("Job details error:", error);

    res.status(500).json({
      error: "Failed to fetch job details",
    });
  } finally {
    await session.close();
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});