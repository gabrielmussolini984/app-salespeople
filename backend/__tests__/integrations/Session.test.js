const request = require("supertest");
const app = require("../../src/app");
const truncate = require("../resetDatabase");
const factory = require("../factory");
describe("Session", () => {
  beforeEach(async () => {
    await truncate();
  });
  it("should authenticate with valid credentials", async () => {
    const user = await factory.create("User", {
      password: "123123"
    });
    const response = await request(app)
      .post("/session")
      .send({
        email: user.email,
        password: "123123"
      });

    expect(response.status).toBe(200);
  });
  it("should not be abble authenticate missing params", async () => {
    const user = await factory.create("User", {
      password: "123123"
    });
    const response = await request(app)
      .post("/session")
      .send({
        email: user.email,
      });

    expect(response.status).toBe(400);
  });
  it("should not authenticate with invalid credentials", async () => {
    const user = await factory.create("User", {
      password: "123123"
    });

    const response = await request(app)
      .post("/session")
      .send({
        email: user.email,
        password: "123456"
      });

    expect(response.status).toBe(401);
  });
  it("should not authenticate with invalid email", async () => {
    const user = await factory.create("User", {
      password: "123124"
    });

    const response = await request(app)
      .post("/session")
      .send({
        email: "email@email.com",
        password: "123456"
      });

    expect(response.status).toBe(404);
  });
  it("should return jwt token when authenticated", async () => {
    const user = await factory.create("User", {
      password: "123123"
    });

    const response = await request(app)
      .post("/session")
      .send({
        email: user.email,
        password: "123123"
      });

    expect(response.body).toHaveProperty("token");
  });

  it("should be able to access private routes when authenticated", async () => {
    const user = await factory.create("User", {
      password: "123123"
    });

    const response = await request(app)
      .get("/sale")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it("should not be able to access private routes without jwt token", async () => {
    const response = await request(app).get("/sale");

    expect(response.status).toBe(401);
  });

  it("should not be able to access private routes with invalid jwt token", async () => {
    const response = await request(app)
      .get("/sale")
      .set("Authorization", `Bearer 123123`);

    expect(response.status).toBe(401);
  });
});
