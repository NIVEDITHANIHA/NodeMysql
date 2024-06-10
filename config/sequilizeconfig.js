const { Sequelize, DataTypes } = require('sequelize');
const dbconfig = require('./dbconfig');

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


  /*dbModelSequilize used for Model used Sequilize function for crud Operations  */
const dbModelSequilize = {}
dbModelSequilize.Sequelize = Sequelize
dbModelSequilize.sequelizeDb = sequelizeDb
dbModelSequilize.products = require("../models/productsmodel")(sequelizeDb, DataTypes)
dbModelSequilize.sequelizeDb.sync({ force: false }).then((res) => {
  console.log("sync done! ");
}).catch((error) => {
  console.log(error);
})

module.exports = {sequelizeDb ,dbModelSequilize}