/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Author = sequelize.define('Author', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
    
  })
  return Author;
}