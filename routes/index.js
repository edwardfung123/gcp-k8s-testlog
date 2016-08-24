var express = require('express');
var router = express.Router();
var logging = require('../lib/logging');

/* GET home page. */
router.get('/', function(req, res, next) {
  //logging.debug('hello');
  res.render('index', { title: 'Express' });
});

router.get('/k8s_health', function(req, res, next) {
  logging.debug('In k8s_health');
  res.end('ok');
});

module.exports = router;
