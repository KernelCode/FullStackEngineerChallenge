"use strict"

const {Model}  = require("sequelize");

module.exports = class PERF extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      score: DataTypes.INTEGER
    }, { 
      sequelize, 
      modelName: 'performance_reviews',
      tableName: "performance_reviews"
    });
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

    this.belongsTo(models.employee, { onDelete: 'cascade' });
    this.belongsTo(models.review, { onDelete: 'cascade' });
    this.hasMany(models.feedback, { onDelete: 'cascade' });
  }
}

