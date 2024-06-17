const {  DataTypes } = require('sequelize');

// importing connection for defining users schema
const { connection } = require('../db');


const UserModel = connection.define('User', {

    deviceId: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    availCoins: DataTypes.INTEGER,
    password: DataTypes.STRING,
    isPrime: DataTypes.BOOLEAN,
  });
connection.sync()

module.exports = {UserModel};