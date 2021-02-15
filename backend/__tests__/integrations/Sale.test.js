const request = require("supertest");
const app = require("../../src/app");
const factory = require("../factory");
const truncate = require("../resetDatabase");
jest.mock("../../src/middlewares/isAuth");
let isAuth = require("../../src/middlewares/isAuth");
isAuth.mockImplementation((req, res, next) => {
  req.userId = 1
  return next();
});

describe("Sale", () => {
  beforeEach(async () => {
    await truncate();
  });
  afterEach(async () => {
    await truncate();
  });
  it("should be abble list sales the user id 1", async () => {
    await factory.create("User");
    const response = await request(app).get("/sale").send();
    expect(response.status).toBe(200);
  });
  it("should not be abble list sales because invalid user", async () => {
    const response = await request(app).get("/sale").send();
    expect(response.status).toBe(404);
  });
  it("should not be abble create sale because need sale_date", async () => {
    const user = await factory.create("User");
    const response = await request(app)
      .post("/sale")
      .send({
        products: [
          { name: user.name, service: true, value: 100 },
          { name: "Product1", service: false, value: 100 },
        ],
      });
    expect(response.status).toBe(400);
  });
  it("should not be abble create sale because need products", async () => {
    const user = await factory.create("User");
    const response = await request(app)
      .post("/sale")
      .send({
        "sale_date": "2021-01-13",
      });
    expect(response.status).toBe(400);
  });
  it("should not be abble create sale because invalid user", async () => {
    const user = await factory.create("User", {id: 2 });
    const response = await request(app)
      .post("/sale")
      .send({
        "sale_date": "2021-01-13",
        products: [
          { name: user.name, service: true, value: 100 },
          { name: "Product1", service: false, value: 100 },
        ],
      });
    expect(response.status).toBe(404);
  });
  it("should be abble create sale", async () => {
    const user = await factory.create("User", {id:1});
    const response = await request(app)
      .post("/sale")
      .send({
        "sale_date": "2021-01-13",
        products: [
          { name: user.name, service: true, value: 100 },
          { name: "Product1", service: false, value: 100 },
        ],
      });
    expect(response.status).toBe(200);
  });
});
