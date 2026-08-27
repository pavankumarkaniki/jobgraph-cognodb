const driver = require("./database");

const seedDatabase = async () => {
  const session = driver.session();

  try {
    // Clear existing data
    await session.run("MATCH (n) DETACH DELETE n");

    // Create Skills
    await session.run(`
      CREATE
        (:Skill {name: "JavaScript"}),
        (:Skill {name: "React"}),
        (:Skill {name: "Node.js"}),
        (:Skill {name: "Express.js"}),
        (:Skill {name: "MySQL"}),
        (:Skill {name: "MongoDB"}),
        (:Skill {name: "HTML"}),
        (:Skill {name: "CSS"}),
        (:Skill {name: "TypeScript"}),
        (:Skill {name: "Git"})
    `);

    // Create Companies
    await session.run(`
      CREATE
        (:Company {name: "TechNova", location: "Hyderabad"}),
        (:Company {name: "CloudWorks", location: "Bangalore"}),
        (:Company {name: "DataSphere", location: "Pune"}),
        (:Company {name: "WebCraft", location: "Chennai"}),
        (:Company {name: "InnovateLabs", location: "Mumbai"})
    `);

    // Create Jobs
    await session.run(`
      CREATE
        (:Job {
          title: "Frontend Developer",
          experience: "0-2 years",
          location: "Hyderabad"
        }),
        (:Job {
          title: "React Developer",
          experience: "1-3 years",
          location: "Bangalore"
        }),
        (:Job {
          title: "Full Stack Developer",
          experience: "1-3 years",
          location: "Hyderabad"
        }),
        (:Job {
          title: "Node.js Developer",
          experience: "1-2 years",
          location: "Pune"
        }),
        (:Job {
          title: "Web Developer",
          experience: "0-2 years",
          location: "Chennai"
        })
    `);

    // Create Candidates
    await session.run(`
      CREATE
        (:Candidate {name: "Pavan", email: "pavan@example.com"}),
        (:Candidate {name: "Rahul", email: "rahul@example.com"}),
        (:Candidate {name: "Anjali", email: "anjali@example.com"})
    `);

    // Candidate -> Skill relationships
    await session.run(`
      MATCH
        (p:Candidate {name: "Pavan"}),
        (r:Candidate {name: "Rahul"}),
        (a:Candidate {name: "Anjali"}),
        (js:Skill {name: "JavaScript"}),
        (react:Skill {name: "React"}),
        (node:Skill {name: "Node.js"}),
        (mysql:Skill {name: "MySQL"}),
        (html:Skill {name: "HTML"}),
        (css:Skill {name: "CSS"}),
        (git:Skill {name: "Git"}),
        (typescript:Skill {name: "TypeScript"})
      CREATE
        (p)-[:HAS_SKILL]->(js),
        (p)-[:HAS_SKILL]->(react),
        (p)-[:HAS_SKILL]->(node),
        (p)-[:HAS_SKILL]->(mysql),
        (p)-[:HAS_SKILL]->(git),

        (r)-[:HAS_SKILL]->(js),
        (r)-[:HAS_SKILL]->(html),
        (r)-[:HAS_SKILL]->(css),

        (a)-[:HAS_SKILL]->(js),
        (a)-[:HAS_SKILL]->(react),
        (a)-[:HAS_SKILL]->(typescript)
    `);

    // Job -> Skill relationships
    await session.run(`
      MATCH
        (frontend:Job {title: "Frontend Developer"}),
        (reactJob:Job {title: "React Developer"}),
        (fullstack:Job {title: "Full Stack Developer"}),
        (nodeJob:Job {title: "Node.js Developer"}),
        (web:Job {title: "Web Developer"}),

        (js:Skill {name: "JavaScript"}),
        (react:Skill {name: "React"}),
        (node:Skill {name: "Node.js"}),
        (express:Skill {name: "Express.js"}),
        (mysql:Skill {name: "MySQL"}),
        (html:Skill {name: "HTML"}),
        (css:Skill {name: "CSS"}),
        (typescript:Skill {name: "TypeScript"}),
        (git:Skill {name: "Git"})
      CREATE
        (frontend)-[:REQUIRES]->(js),
        (frontend)-[:REQUIRES]->(react),
        (frontend)-[:REQUIRES]->(html),
        (frontend)-[:REQUIRES]->(css),

        (reactJob)-[:REQUIRES]->(js),
        (reactJob)-[:REQUIRES]->(react),
        (reactJob)-[:REQUIRES]->(typescript),
        (reactJob)-[:REQUIRES]->(git),

        (fullstack)-[:REQUIRES]->(js),
        (fullstack)-[:REQUIRES]->(react),
        (fullstack)-[:REQUIRES]->(node),
        (fullstack)-[:REQUIRES]->(mysql),
        (fullstack)-[:REQUIRES]->(git),

        (nodeJob)-[:REQUIRES]->(js),
        (nodeJob)-[:REQUIRES]->(node),
        (nodeJob)-[:REQUIRES]->(express),
        (nodeJob)-[:REQUIRES]->(mysql),

        (web)-[:REQUIRES]->(html),
        (web)-[:REQUIRES]->(css),
        (web)-[:REQUIRES]->(js),
        (web)-[:REQUIRES]->(git)
    `);

    // Job -> Company relationships
    await session.run(`
      MATCH
        (frontend:Job {title: "Frontend Developer"}),
        (reactJob:Job {title: "React Developer"}),
        (fullstack:Job {title: "Full Stack Developer"}),
        (nodeJob:Job {title: "Node.js Developer"}),
        (web:Job {title: "Web Developer"}),

        (techNova:Company {name: "TechNova"}),
        (cloudWorks:Company {name: "CloudWorks"}),
        (dataSphere:Company {name: "DataSphere"}),
        (webCraft:Company {name: "WebCraft"}),
        (innovateLabs:Company {name: "InnovateLabs"})
      CREATE
        (frontend)-[:POSTED_BY]->(techNova),
        (reactJob)-[:POSTED_BY]->(cloudWorks),
        (fullstack)-[:POSTED_BY]->(dataSphere),
        (nodeJob)-[:POSTED_BY]->(innovateLabs),
        (web)-[:POSTED_BY]->(webCraft)
    `);

    // Skill -> Skill relationships
    await session.run(`
      MATCH
        (js:Skill {name: "JavaScript"}),
        (react:Skill {name: "React"}),
        (node:Skill {name: "Node.js"}),
        (express:Skill {name: "Express.js"}),
        (typescript:Skill {name: "TypeScript"})
      CREATE
        (js)-[:RELATED_TO]->(react),
        (js)-[:RELATED_TO]->(node),
        (node)-[:RELATED_TO]->(express),
        (js)-[:RELATED_TO]->(typescript)
    `);
    await session.run(`
  MATCH
    (frontend:Job {title: "Frontend Developer"}),
    (reactJob:Job {title: "React Developer"}),
    (fullstack:Job {title: "Full Stack Developer"}),
    (nodeJob:Job {title: "Node.js Developer"}),
    (web:Job {title: "Web Developer"}),

    (js:Skill {name: "JavaScript"}),
    (react:Skill {name: "React"}),
    (node:Skill {name: "Node.js"}),
    (mysql:Skill {name: "MySQL"}),
    (html:Skill {name: "HTML"}),
    (css:Skill {name: "CSS"}),
    (typescript:Skill {name: "TypeScript"})

  CREATE
    (frontend)-[:REQUIRES]->(js),
    (frontend)-[:REQUIRES]->(html),
    (frontend)-[:REQUIRES]->(css),

    (reactJob)-[:REQUIRES]->(js),
    (reactJob)-[:REQUIRES]->(react),
    (reactJob)-[:REQUIRES]->(html),

    (fullstack)-[:REQUIRES]->(js),
    (fullstack)-[:REQUIRES]->(react),
    (fullstack)-[:REQUIRES]->(node),
    (fullstack)-[:REQUIRES]->(mysql),

    (nodeJob)-[:REQUIRES]->(node),
    (nodeJob)-[:REQUIRES]->(js),

    (web)-[:REQUIRES]->(html),
    (web)-[:REQUIRES]->(css),
    (web)-[:REQUIRES]->(js)
`);
await session.run(`
  MATCH
    (tech:Company {name: "TechNova"}),
    (cloud:Company {name: "CloudWorks"}),
    (data:Company {name: "DataSphere"}),
    (webCompany:Company {name: "WebCraft"}),
    (innovate:Company {name: "InnovateLabs"}),

    (frontend:Job {title: "Frontend Developer"}),
    (reactJob:Job {title: "React Developer"}),
    (fullstack:Job {title: "Full Stack Developer"}),
    (nodeJob:Job {title: "Node.js Developer"}),
    (web:Job {title: "Web Developer"})

  CREATE
    (tech)-[:POSTED]->(frontend),
    (cloud)-[:POSTED]->(reactJob),
    (tech)-[:POSTED]->(fullstack),
    (data)-[:POSTED]->(nodeJob),
    (webCompany)-[:POSTED]->(web),
    (innovate)-[:POSTED]->(fullstack)
`);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await session.close();
    await driver.close();
  }
};

seedDatabase();