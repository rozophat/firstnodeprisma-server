/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book1', {
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
    genre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  })
  return Book;
}