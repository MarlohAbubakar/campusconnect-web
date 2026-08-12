const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Sample campus events
let events = [
  {
    id: 1,
    title: "AI & XAI Research Seminar",
    date: "2026-08-20",
    location: "Computer Science Auditorium",
    description:
      "A seminar introducing students to Artificial Intelligence and Explainable AI.",
    attendees: [],
  },
  {
    id: 2,
    title: "Codefest Africa Hackathon",
    date: "2026-08-25",
    location: "University Innovation Hub",
    description:
      "A practical coding and innovation event for students and developers.",
    attendees: [],
  },
  {
    id: 3,
    title: "Software Engineering Workshop",
    date: "2026-09-02",
    location: "Engineering Lecture Theatre",
    description:
      "A hands-on workshop covering modern software engineering practices.",
    attendees: [],
  },
];

// GET all events
app.get("/api/events", (req, res) => {
  res.json(events);
});

// GET one event
app.get("/api/events/:id", (req, res) => {
  const event = events.find(
    (event) => event.id === Number(req.params.id)
  );

  if (!event) {
    return res.status(404).json({
      error: "Event not found",
    });
  }

  res.json(event);
});

// POST attendance
app.post("/api/events/:id/attend", (req, res) => {
  const event = events.find(
    (event) => event.id === Number(req.params.id)
  );

  if (!event) {
    return res.status(404).json({
      error: "Event not found",
    });
  }

  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      error: "Name is required",
    });
  }

  event.attendees.push(name.trim());

  res.status(200).json({
    message: "Attendance recorded successfully",
    event,
  });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`CampusConnect API running on port ${PORT}`);
  });
}

module.exports = app;