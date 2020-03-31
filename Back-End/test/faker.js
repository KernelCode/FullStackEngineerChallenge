

const faker = require('faker');
const fs = require("fs");
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// delete old database !
fs.unlinkSync("./emps.sqlite");
const database = require("../db_api")({
  "databasename":"fullstackchalling",
  "database_filename":"./emps.sqlite",
  "username":"",
  "password":""
});
database.connect().then(async ()=>{
  await database.models.employee.create({
    name:"admin",
    email:"admin@admin.com",
    password:"202cb962ac59075b964b07152d234b70",
    level:0
  });
  
  setTimeout(async ()=>{
    await database.models.review.create({
      title:"Quality",
    });
    await database.models.review.create({
      title:"Productivity",
    });
    await database.models.review.create({
      title:"Independence",
    });
    await database.models.review.create({
      title:"Reliability",
    });
    await database.models.review.create({
      title:"Job Knowledge",
    });
    await database.models.review.create({
      title:"Cooperation",
    });
    await database.models.review.create({
      title:"Commmitment",
    });
    await database.models.review.create({
      title:"Attendance",
    });






    for(var i=2;i<12;i++){
      console.log("creating ",i);
      await database.models.employee.create({
        name:faker.name.findName(),
        email:faker.internet.email(),
        password:"202cb962ac59075b964b07152d234b70",
        level:3
      });

      for(var g=1;g<getRandomInt(1,6);g++){
        await database.models.performance_review.create({
          score:getRandomInt(5,9),
          employeeId:i,
          reviewId:g
        });
      }
      
    
      
    }
  
  },1000)


}).catch((err)=>{
  console.log("error connecting to database",err);
  process.exit;
});
