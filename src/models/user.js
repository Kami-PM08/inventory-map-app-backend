const { DataTypes } = require("sequelize");
const { psqlDB } = require("../database/config");

const User = psqlDB.define("User", {
    user_name: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING
    },
    rol: {
        type: DataTypes.STRING,
        values: ["ADMIN", "OPERATOR"]
    }
},
{
    tableName: "users"
});

module.exports = User;