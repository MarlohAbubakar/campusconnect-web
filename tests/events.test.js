const supertest = require("supertest");
const app = require("../server");

const request = supertest(app);

describe("CampusConnect Events API", () => {
  test("GET /api/events returns a list of events", async () => {
    const response = await request.get("/api/events");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("GET /api/events/1 returns an event", async () => {
    const response = await request.get("/api/events/1");

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("AI & XAI Research Seminar");
  });

  test("GET /api/events/999 returns 404", async () => {
    const response = await request.get("/api/events/999");

    expect(response.statusCode).toBe(404);
  });

  test("POST attendance requires a name", async () => {
    const response = await request
      .post("/api/events/1/attend")
      .send({});

    expect(response.statusCode).toBe(400);
  });

  test("POST attendance records a student", async () => {
    const response = await request
      .post("/api/events/1/attend")
      .send({
        name: "Test Student"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "Attendance recorded successfully"
    );
  });
});