require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});


const database = {
  test: {
    dialect: "sqlite",
    storage: "./__tests__/database.db",
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
    }
  },
  dev: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: "postgres",
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
    }
  }
}

module.exports = database[process.env.NODE_ENV || 'dev']