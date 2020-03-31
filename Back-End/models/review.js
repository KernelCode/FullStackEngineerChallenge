"use strict"

const {Model}  = require("sequelize");


module.exports = class REVIEW extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        title: DataTypes.TEXT
      }, { 
        sequelize, 
        modelName: 'reviews',
        tableName: "reviews"
      }
    );
  }
  static getById(where) {
    return this.findOne({
      where,
      order: [["createdAt", "DESC"]]
    });
  }
  getJSON(){
    return this.dataValues;
  }
  static associate(models) {
    this.hasMany(models.performance_review, { onDelete: 'cascade' });
  }
}

