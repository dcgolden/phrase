// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var passport = require('passport');
var flash 	 = require('connect-flash');
var http     = require('http');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var User     = require('./models/user');
var Classroom	= require('./models/classroom');
var Article	 = require('./models/article');

mongoose.connect('mongodb://test:test@novus.modulusmongo.net:27017/a3pemoGa')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
})); 


var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

var auth = function(req, res, next) {
	if (!req.isAuthenticated())
		res.send(401);
	else
		next();
};

router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

router.use(function(req, res, next) {
	console.log('Something is happening.');
	next();
})

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'this call was a success!' });	
});

router.get('/loggedin', function(req, res) {
	res.send(req.isAuthenticated() ? req.user : '0');
});

router.post('/login', passport.authenticate('local'), function(req, res) {
	res.send(req.user);
});

router.post('/logout', function(req, res) {
	req.logOut();
	res.send(200);
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ USERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
router.route('/users', auth)

	// create a user (accessed at POST http://localhost:8080/api/users)
	.post(function(req, res) {
		
		var user = new User(); 		// create a new instance of the User model
		user.email = req.body.email;
		user.password = req.body.password;
		user.name = req.body.name;
		user.bio = req.body.bio;
		//user.classroom = null;

		// save the user and check for errors
		user.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'User created!' });
		});
		res.json(user.id)
	})

	.get(function(req, res) {
		User.find(function(err, users) {
			if (err)
				res.send(err);

			res.json(users);
		});
	});

router.route('/users/:user_id')

	// get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if(err)
				res.send(err);
			res.json(user);
		})
	})

	// update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
	.put(function(req, res) {
		// use our user model to find the user we want
		User.findById(req.params.user_id, function(err, user) {

			if (err)
				res.send(err);

			user.name = req.body.name;  // set the users name (comes from the request)
			user.email = req.body.email;
			user.password = req.body.password;
			user.bio = req.body.bio;
			user.classroomIds = req.body.classroomIds;
			
			// save the user
			user.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'User updated!' });
			});

		});
	})

	// delete the user with this id (accessed at DELETE http://localhost:8080/api/users/:user_id)
	.delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if(err)
				res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
	});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CLASSROOMS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
router.route('/classrooms')

	// create a classrooms (accessed at POST http://localhost:8080/api/classrooms)
	.post(function(req, res) {
		
		var classroom = new Classroom(); 		// create a new instance of the Classroom model
		classroom.classroomName = req.body.classroomName;  // set the classrooms name (comes from the request)


		// save the classroom and check for errors
		classroom.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Classroom created!' });
		});
		res.json(classroom.id)
	})

	.get(function(req, res) {
		Classroom.find(function(err, classrooms) {
			if (err)
				res.send(err);

			res.json(classrooms);
		});
	});

router.route('/classrooms/:classroom_id')

	// get the classrooms with that id (accessed at GET http://localhost:8080/api/classroomss/:classroom_id)
	.get(function(req, res) {
		Classroom.findById(req.params.classroom_id, function(err, classroom) {
			if(err)
				res.send(err);
			res.json(classroom);
		})
	})
	// update the classrooms with this id (accessed at PUT http://localhost:8080/api/clasroomss/:classroom_id)
	.put(function(req, res) {
		// use our classroom model to find the classrooms we want
		Classroom.findById(req.params.classroom_id, function(err, classroom) {

			if (err)
				res.send(err);

			classroom.classroomName = req.body.classroomName;
			
			// save the classroom
			classroom.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Classroom updated!' });
			});

		});
	})

	// delete the classroom with this id (accessed at DELETE http://localhost:8080/api/classrooms/:classroom_id)
	.delete(function(req, res) {
		Classroom.remove({
			_id: req.params.classroom_id
		}, function(err, classroom) {
			if(err)
				res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
	});

router.route('/classrooms/:classroom_id/articles')
	//get the articles in the classroom with this id (accessed at GET http://localhost:8080/api/classrooms/:classroom_id/articles)
	.get(function(req, res) {
		Classroom.findById(req.params.classroom_id, function(err, classroom) {
			if(err)
				res.send(err);
			res.json(classroom.articles);
		})
	})

	//update the articles in the classroom with this id (accessed at PUT http://localhost:8080/api/classrooms/:classroom_id/articles)
	.put(function(req, res) {
		// use our classroom model to find the classrooms we want
		Classroom.findById(req.params.classroom_id, function(err, classroom) {

			if (err)
				res.send(err);
				
		Classroom.update({_id: req.params.classroom_id },
         {$push: { 'articles' : req.body.articles }},{upsert:true}, function(err, data) {
         	if(err)
         		res.send(err); 
});		
		
			// save the new articles
			//classroom.save(function(err) {
			//	if (err)
			//		res.send(err);

				//res.json({ message: 'Classroom articles updated!' });
			//});

		});
	});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ARTICLES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
router.route('/articles')

	// create a article (accessed at POST http://localhost:8080/api/article)
	.post(function(req, res) {
		
		var article = new Article(); 		// create a new instance of the Article model
		article.classroomID = req.body.classroomID;
		article.title = req.body.title;
		article.author = req.body.author;
		article.source = req.body.source;
		article.content = req.body.content;


		// save the article and check for errors
		article.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Article created!' });
		});
		var newArticleId = article._id;
                res.json(article.id)
	})

	.get(function(req, res) {
		Article.find(function(err, articles) {
			if (err)
				res.send(err);

			res.json(articles);
		});
	});

router.route('/articles/:article_id')

	// get the article with that id (accessed at GET http://localhost:8080/api/articles)
	.get(function(req, res) {
		Article.findById(req.params.article_id, function(err, article) {
			if(err)
				res.send(err);
			res.json(article);
		})
	})

	// update the article with this id (accessed at PUT http://localhost:8080/api/article/:article_id)
	.put(function(req, res) {
		// use our article model to find the article we want
		Article.findById(req.params.article_id, function(err, article) {

			if (err)
				res.send(err);

			article.classroomID = req.body.classroomID;
			article.title = req.body.title;
			article.author = req.body.author;
			article.source = req.body.source;
			article.content = req.body.content;
			
			// save the classroom
			article.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Article updated!' });
			});

		});
	})

	// delete the article with this id (accessed at DELETE http://localhost:8080/api/articles/:article_id)
	.delete(function(req, res) {
		Article.remove({
			_id: req.params.article_id
		}, function(err, article) {
			if(err)
				res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
		Classroom.update({_id: req.params.article.classroomID },
         {$pull: { 'articles' : req.params.article_id }}, function(err, data) {
         	if(err)
         		res.send(err); 
});		
	});


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("WE'RE WATCHING YOU ON PORT " + port + ", KATIE");
