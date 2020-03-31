"use strict"

const Sequelize = require("sequelize");
const path = require("path");

// Returning (singleton pattern) object
module.exports = function orm(config){
  if (!(this instanceof ORM)) return new ORM(config);
}


// modals to comunicate with database 

const employee = require("./models/emp");
const feedback = require("./models/feed");
const performance_review = require("./models/perf");
const review = require("./models/review");





class ORM{


  constructor(config){

    // username and password of the database in case we need to switch between sqlite and mysql databases
    // database username
    this.username = config.username;

    // database password
    this.password = config.password;


    // setting sqlite file
    this.db_path = path.resolve(config.database_filename)

    // database name 
    this.database_name = config.databasename;

    //setup database
    this.database = new Sequelize(this.database_name, this.username, this.password, {
      database: this.database_name,
      dialect: 'sqlite',
      storage: this.db_path,
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
      logging: false 
    }); 

    // models
    this.models = {
      employee: employee.init(this.database,Sequelize),
      feedback: feedback.init(this.database, Sequelize),
      performance_review: performance_review.init(this.database, Sequelize),
      review: review.init(this.database, Sequelize)
    };

    // database relations
    Object.values(this.models)
      .filter((model) => typeof model.associate === "function"
      )
      .forEach((model) => {
        model.associate(this.models)
      });


    this.database.sync();
  }

  async connect(){
    return this.database.authenticate()
  }

}