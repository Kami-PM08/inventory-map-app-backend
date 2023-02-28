const { Sequelize } = require("sequelize");
const mongoose = require("mongoose");

const mongodbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB online");
  } catch (error) {
    console.error(error);
    throw new Error("Error de conexión con MongoDB");
  }
};

const psqlDB = new Sequelize(process.env.DATABASE_URL);

const psqldbConnection = async () => {
  try {
    await psqlDB.authenticate();
    console.log("PostgreSQL online");
  } catch (error) {
    console.error(error);
    throw new Error("Error de conexión con PostgreSQL");
  }
};

const dbConnections = async () => {
  await mongodbConnection();
  await psqldbConnection();
};

module.exports = {
  dbConnections,
  psqlDB,
};
