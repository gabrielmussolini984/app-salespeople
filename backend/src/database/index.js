const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("../config/database");
const db = {};

const connection = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const models = []
fs.readdirSync(path.resolve(__dirname, '..', 'modules' )).forEach(mod => {
  const model = fs.readdirSync(path.resolve(__dirname, '..', 'modules', mod, 'model' ))[0]
  models.push(model)
})

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));




fs.readdirSync(path.resolve(__dirname,"..", "modules"))
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;