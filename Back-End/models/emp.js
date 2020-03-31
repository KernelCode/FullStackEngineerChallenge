"use strict"

const {Model} = require("sequelize");

module.exports  = class EMP extends Model {

  static init(sequelize,DataTypes) {

    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: DataTypes.TEXT,
      email: DataTypes.TEXT,
      password: DataTypes.STRING(32),
      level: DataTypes.INTEGER
  
    }, { 
      sequelize: sequelize,
      modelName: 'employees',
      tableName: "employees"
    });
  }

  changePassword(password) {
    this.set('password', password);
    return this.save();
  }
  static getEmp(models,id){
    return this.findOne({
      include: [{
        model: models.performance_reviews,
        include: [{
          model: models.reviews,
          attributes: ['title']
        }],
        attributes: ['score', 'id', 'createdAt','reviewId'],
      }],
      where:{id:id},
      order: [["id", "ASC"]]
    });
  }
  static getTable(tableData,models){
  
    return this.findAndCountAll({
      include: [{
        model: models.performance_reviews,
        include: [{
          model: models.reviews,
          attributes: ['title']
        }],
        attributes: ['score', 'id', 'createdAt','reviewId'],
      }],
      order: [["id", "ASC"]],
      offset: tableData.page*tableData.pageSize, 
      limit: tableData.pageSize
    });
  }
  static getBy(where) {
 
    return this.findOne({
      where,
      order: [["createdAt", "DESC"]]
    });
  }
  getJSON(){
    return this.dataValues;
  }
  static associate(models) {

    this.hasMany(models.feedback, { onDelete: 'cascade' });
    this.hasMany(models.performance_review, { onDelete: 'cascade' });

  }
}

