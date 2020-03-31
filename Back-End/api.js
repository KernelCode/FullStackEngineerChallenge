const md5 = require("md5");
module.exports = (app, db) => {
  app.use(function (req, res,next) {
  
    if(req.body && req.body.password){
     
      if(req.body.password!==''){
        
        req.body.password = md5(req.body.password);
      }
     
    }else{
      if(req.method=="PUT"){
       
        delete req.body.password;
      }
    }
      
      
    next();
  });
  app.post('*', function (req, res,next) {
 
    if(!req.busboy){next(); return}
    
		req.body = {};
		req.files = {};

		req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
		
			var saveTo = path.join(__dirname+"/tmp", path.basename(fieldname));
      file.pipe(fs.createWriteStream(saveTo));
				
				req.files[fieldname] = {
					filename:filename,
					encoding:encoding,
					mimetype:mimetype,
					path:path.resolve(saveTo)
				}
				
		});
		req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
			
			if(key.indexOf("[]")>=0){
				key = key.replace("[]","");
				if(typeof req.body[key] == "undefined")
					req.body[key] = [];

				req.body[key].push(value);
			}else{
				if(typeof req.body[key] !="undefined"){
					req.body[key] = req.body[key]+","+value;
				}else{
					req.body[key] = value;
				}
				
			}
		});
		
		req.busboy.on('finish', function() {

			next();

		});
		
		req.pipe(req.busboy);
		
		
  });
  
  app.use(function (req, res,next) {

    if(req.method =="POST" && req.url.search("login")>-1){
      next();
      return;
    }

    if(!req.session.user){
      res.send({msg:"redirect",page:"login"});
      return;
    }

    // we check if user's trying to access admin page without permissions
    if(req.session.user.level!=0 && req.url.search("admin")>-1){
      res.send({msg:"redirect",page:"/"});
      return;
    }
    next();
  });
  
  app.get( "/logout", (req, res) =>{
      delete req.session.user;
      res.send({msg:"ok"});
    }
  );
  app.get( "/islogin", (req, res) =>{
      if(req.session.user)
        res.send({msg:"ok",data:req.session.user})
      else
        res.send({msg:"no"})
    }
  );
  app.get(`/employe/:id`, (req, res) =>{
    db.database.models['employees'].getEmp(db.database.models,req.params.id).then( (result) => res.json(result));
  });
  app.get( "/feedbacks/:perfId", (req, res) =>{
   
    db.database.models['feedbacks'].getAllBy({
      performanceReviewId:req.params.perfId
    },db.database.models).then( (result) => res.json(result) )
  });
  app.get( "/:tab/:offset/:limit", (req, res) =>{
      db.database.models[req.params.tab].findAll({ offset: req.params.offset, limit: req.params.limit }).then( (result) => res.json(result) )
    }
  );
  

  app.get( "/:tab/all", (req, res) =>
     db.database.models[req.params.tab].findAll().then( (result) => res.json(result) )
  );
  app.get( "/:tab/:id", (req, res) =>
    db.database.models[req.params.tab].getBy({id:req.params.id}).then( (result) => res.json(result))
  );
  
  app.post(`/postFeedback`, (req, res) =>{
    console.log(req.body);
    db.database.models['feedbacks'].create({
      performanceReviewId:req.body.prefId,
      employeeId:req.session.user.id,
      feedback:req.body.feedback
    }).then( (result) => res.json(result) )
 
  });
  app.post(`/getTable/:table`, (req, res) =>{
      // not supported currentlly
      //sorted: state.sorted,
      //filtered: state.filtered
    db.database.models[req.params.table].getTable(req.body,db.database.models).then( (result) => res.json(result));
  });
  app.post(`/login`, (req, res) =>{
    console.log(req.body)
    db.database.models['employees'].getBy(req.body).then( (result) =>{
      if(result){
        delete result.dataValues.password;
        req.session.user = result;
        res.send({msg:"ok",data:result});
      }else{
        res.send({msg:"not_found"});
      }
    })
  });

  // admin API
  
  app.get( "/admin/addTag/:tagId/:userId", (req, res) =>{
    db.database.models['performance_reviews'].create({
      score:9.3,
      employeeId:req.params.userId,
      reviewId:req.params.tagId
    }).then( (result) => res.json(result))
  });
  app.get( "/admin/removeTag/:tagId/:userId", (req, res) =>{
    db.database.models['performance_reviews'].destroy({
      where: {
        employeeId:req.params.userId,
        reviewId:req.params.tagId
      }
    }).then( (result) => res.json(result))
  });
  app.post(`/admin/:tab`, (req, res) => {
   
    db.database.models[req.params.tab].create(req.body).then( (result) => res.json(result) )
  });

  app.put( `/admin/:tab/:id`, (req, res) =>{
      console.log(req.body)
      db.database.models[req.params.tab].update(req.body,
      {
        where: {
          id: req.params.id
        }
      }).then( (result) => res.json(result) )
    }
  );

  app.delete( `/admin/:tab/:id`, (req, res) =>
    db.database.models[req.params.tab].destroy({
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
  );

  // emp API
  app.post("/feedback/:emp_id/:perf_id", (req, res) => 
    db.database.models.feedback.create({
      feedback: req.body.feedback,
      perf_id: req.body.perf_id,
      emp_id: req.body.emp_id
    }).then( (result) => res.json(result) )
  );

  app.delete( "/feedback/:id", (req, res) =>
    db.database.models.feedback.destroy({
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
  );
}