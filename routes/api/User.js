var express = require('express');
var router = express.Router();

var control = require('../../controllers/User')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond test api /uesr');
});

// Create User
router.post('/', function(req, res, next) {
  control.createUser(req, res, next, req.body);
});

router.post('/createWithArray', function(req, res, next) {
  control.createWithArray(req, res, next, req.body);
});

router.post('/createWithList', function(req, res, next) {
  control.createWithList(req, res, next, req.body);
});

// Login
router.get('/login', function(req, res, next) {
  control.loginUser(req, res, next, req.query.username, req.query.password);
});

router.get('/logout', function(req, res, next) {
  control.logoutUser(req, res, next, req.params.name);
});

// Management
router.get('/:name', function(req, res, next) {
  control.getUserByName(req, res, next, req.params.name);
} );

router.put('/:name', function(req, res, next) {
  control.updateUser(req, res, next, req.body, req.params.name);
} );

router.delete('/:name', function(req, res, next) {
  control.deleteUser(req, res, next, req.params.name);
} );

module.exports = router;
