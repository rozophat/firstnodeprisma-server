/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Author = sequelize.define('Author', {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    age: {
      type: DataTypes.STRING,
      allowNull: true
    }
    
  })
  return Author;
}