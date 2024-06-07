const { Sequelize, DataTypes } = require('sequelize');
const dbconfig = require('../config/dbconfig');

const sequelize = new Sequelize(dbconfig.db, dbconfig.user, dbconfig.password, {
  host: dbconfig.host,
  dialect: dbconfig.dialect,
  logging: false,
});


sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');

})
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  })
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require("./productsmodel")(sequelize, DataTypes)
db.sequelize.sync({ force: false }).then((res) => {
  console.log("sync done! ");
}).catch((error) => {
  console.log(error);
})

module.exports = db