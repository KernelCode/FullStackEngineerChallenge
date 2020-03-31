"use strict"

// express,http and session
const express = require('express');
const http = require('http');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync(__dirname+"/config/config.json"));
const database = require("./db_api")(config.database);
const cookieSession = require('cookie-session');

const busboy = require('connect-busboy');
const cors = require('cors')

const app = express();


// so we can run front-end at devlopemnt server and still be able connect to back-end
app.use(cors({credentials: true, origin: true}));
app.use(cookieSession({
  name: 'TestSession',
  //keys: ['aa','fff'],
  secret:"testing",
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(busboy());
// to support application/json witch busboy dosen't support !
app.use(express.json())

// connect/create database
database.connect().then(async ()=>{
  //start app
  require("./api")(app,database);
  (http.createServer(app).listen(3333));
  console.log("Listening on port : 3333");
}).catch((err)=>{
  console.log("error connecting to database",err);
  process.exit;
});