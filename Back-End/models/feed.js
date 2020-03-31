"use strict"

const {Model}  = require("sequelize");

module.exports = class FEED extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      feedback: DataTypes.TEXT
    }, { 
      sequelize, 
      modelName: 'feedbacks',
      tableName: "feedbacks"
    });
  }
  static getById(where) {
    return this.findOne({
      where,
      order: [["createdAt", "DESC"]]
    });
  }
  static getAllBy(where,models) {
   
    return this.findAll({
      where,
      include: [{
        model: models.employees,
        attributes: ['name', 'id'],
      }],
      order: [["createdAt", "DESC"]]
    });
  }
  getJSON(){
    return this.dataValues;
  }
  static associate(models) {
    this.belongsTo(models.employee, { onDelete: 'cascade' });
    this.belongsTo(models.performance_review, { onDelete: 'cascade' });
  }
}

