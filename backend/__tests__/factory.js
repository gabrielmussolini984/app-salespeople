const {User} = require("../src/models");
const faker = require("faker");
const { factory } = require("factory-girl");

factory.define("User", User, {
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  years_company: faker.random.number(),
});
module.exports = factory;