const { Sequelize, DataTypes } = require('sequelize');
const dbconfig = require('../config/dbconfig');

const sequelizeDb = new Sequelize(dbconfig.db, dbconfig.user, dbconfig.password, {
  host: dbconfig.host,
  dialect: dbconfig.dialect,
  logging: false,
});


sequelizeDb.authenticate().then(() => {
  console.log('Connection has been established successfully.');

})
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  })
const db = {}
db.Sequelize = Sequelize
db.sequelizeDb = sequelizeDb

db.products = require("./productsmodel")(sequelizeDb, DataTypes)
db.sequelizeDb.sync({ force: false }).then((res) => {
  console.log("sync done! ");
}).catch((error) => {
  console.log(error);
})

module.exports = {sequelizeDb ,db}