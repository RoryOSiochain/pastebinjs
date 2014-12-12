'use strict';
var config = require('./config')
  , common = require('./common')
  , controllers = require('./controllers')
  , logger = require('./logger').logger
  , express = require('express')
  , app = express()
  , bodyParser = require('body-parser');

// Configure Express.JS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '/static'));

/* Home and Submit page */
app.get('/', function (req, res) {
	res.redirect('/static/index.html');
});
app.get('/static/p/:postId', function (req, res) {
	res.redirect('/static/index.html');
});

app.get('/api/recent',
	controllers.api.getRecentPosts);
app.get('/api/post/:postId',
	controllers.api.getPost);
app.get('/api/post/:postId/download',
	controllers.api.downloadPost);
app.post('/api/post',
	controllers.api.submitPost);
app.delete('/api/post/:postId',
	controllers.api.deletePost);


logger.info('pastebin.js started! listening on 0.0.0.0/' + config.listenport);
app.listen(config.listenport);