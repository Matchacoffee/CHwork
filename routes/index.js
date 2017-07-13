var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var http = require('http').Server(app);
var fs = require('fs');
var cors = require('cors');
var _cookie = null;

var _userInfo = { };

if (fs.existsSync('./userInfo.log')) {
	_userInfo = fs.readFileSync('./userInfo.log');
	if (_userInfo == '') {
		initUser();
	} else {
		_userInfo = JSON.parse(_userInfo);
		if (!_userInfo.username ||
			!_userInfo.password ||
			!_userInfo.name ||
			!_userInfo.gender ||
			!_userInfo.address) {
			initUser();
		}
	}
} else {
	initUser();
}

if (fs.existsSync('./posts.log')) {
	_posts = fs.readFileSync('./posts.log');
	if (_posts == '') {
		initPosts();
	} else {
		_posts = JSON.parse(_posts);
	}
} else {
	initPosts();
}



app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('web'));
app.use(cors({
	methods: ['GET', 'POST', 'PATCH', 'OPTION', 'DELETE'],
	credentials: true,
	origin: true
}));

exports.login = function (req,res){
  var username = req.body.username;
  var password = req.body.password;
  if(username =='admin' && password == _userInfo.password) {
		res.cookie('_nodejs_session',{ httpOnly: true });
		var user = _userInfo;
		res.status(200).json(user);
  /*
	var user = Object.assign({}, _userInfo);
  delete user.password;
  res.json(user);
	*/
  } else {
		res.status(401).json({
 			msg: 'UCCU'
 		});
  };
};

exports.dologin = function (req, res) {
 if (isLogin = true) {
   res.status(200).json({
		 msg:'200'
	 });
	 /*
	 var user = Object.assign({}, _userInfo);
	 delete user.password;
	 res.json(user);
	 */
 } else {
	 res.status(401).json({
		 msg: 'no login'
	 });
 }
};

exports.logout = function (req, res) {
	if (isLogin = true) {
		_cookie = null;
		res.json({
			msg: 'logout'
		})
	} else {
		res.status(401).json({
			msg: 'no login'
		})
	}
};

exports.posts = function (req , res){
		var title = req.body.title;
		var tags = req.body.tags;
		var content = req.body.content;
		var author = _userInfo.username;
		var i = 0;
		var id = i;
		var date = moment().format();
		console.log(date);
		var posts = [
			title,
			author,
			id,
			content,
			date,
			tags
		];
		console.log(posts);
		_posts = [posts];
		writeFile('posts',posts);
		res.json(posts);
		i ++ ;
		
		if(isLogin = false){
			res.status(401).json({
				msg: 'no login'
			});
		}
};

exports.npost = function(req , res){
 res.json(_posts);
}

function writeFile(fileName, content) {
  fs.writeFile(`./${fileName}.log`, JSON.stringify(content), function (err) {
  	if (err) {
  		console.error(err);
  		return;
  	}
  	console.log(`[write file] ${fileName}.log`);
  });
}

function initPosts(){
	_posts = [];
	writeFile('posts',_posts);
}

function isLogin() {
	var isLogin = false;
	if (username == 'admin' && password == _userInfo.password) {
	  isLogin = true;
	}else{
		isLogin = false;
	}
};

function initUser() {
	_userInfo = {
		username: 'admin',
		password: '123456',
		name: 'JonilaRS',
		gender: 'm',
		address: 'Puli'
	};
	writeFile('userInfo', _userInfo);
}
