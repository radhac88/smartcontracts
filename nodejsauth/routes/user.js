exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
     
      var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
      db.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            console.log(results[0].id);
            res.redirect('/home/dashboard');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('index.ejs',{message: message});
            
         }
                 
      });
   } else {
      res.render('index.ejs',{message: message});
    
   }         
};

exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var email = post.email_id;
      var accountid = post.account_id;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.mob_no;
      var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`,`email_id`,`account_id`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + email +"','" + accountid +"')";
      console.log(sql)
      var query = db.query(sql, function(err, result) {
         console.log(err);
         console.log(result);
         message = "Succesfully! Your account has been created.";
         res.render('signup.ejs',{message: message});
      });

   } else {
      res.render('signup');
   }
};

exports.dashboard = function(req, res, next){
	
	var user =  req.session.user,
	userId = req.session.userId;
   console.log(user);
	
	if(userId == null){
		res.redirect("/home/login");
		return;
	}
   else{

    var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";
    console.log(sql);
      db.query(sql, function(err, results){   
         console.log(results); 
         var user1 = user.user_name;
         res.render('profile.ejs', {user:user1});  
		});
   }

};