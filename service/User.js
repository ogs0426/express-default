var mongoose = require('mongoose');
var User = require('../models/User');

var default_user_data = 
{
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "userStatus": 0
}

/**
 * Create user
 * This can only be done by the logged in user.
 *
 * body User Created user object
 * no response value expected for this operation
 **/
exports.createUser = function(body) {
  return new Promise(function(resolve, reject) {
    var user = new User();

    // require
    user.username = body.username
    user.email = body.email
    user.password = body.password
    user.phone = body.phone
    
    user.save(function(err){
      if(err) {
          console.error(err);
          reject({result: 0, message: err});
          return;
      }

      resolve({result: 1, Object: user});
    });
  });
}

/**
 * Creates list of users with given input array
 *
 * body List List of user object
 * no response value expected for this operation
 **/
exports.createUsersWithArrayInput = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Creates list of users with given input array
 *
 * body List List of user object
 * no response value expected for this operation
 **/
exports.createUsersWithListInput = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * username String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = function(username) {
  return new Promise(function(resolve, reject) {
    User.remove({ username: username }, function(err, output){
      if(err) return reject({ error: "database failure" });

      /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
      if(!output.result.n) return res.status(404).json({ error: "book not found" });
      res.json({ message: "book deleted" });
      */

      resolve();
    })
  });
}


/**
 * Get user by user name
 *
 * username String The name that needs to be fetched. Use user1 for testing.
 * returns User
 **/
exports.getUserByName = function(username) {
  return new Promise(function(resolve, reject) {
    /*
    User.find(function(err, users){
      if(err) return res.status(500).send({error: 'database failure'});
      res.json(users);
    })

    Book.find({author: req.params.author}, {_id: 0, title: 1, published_date: 1},  function(err, books){
        if(err) return res.status(500).json({error: err});
        if(books.length === 0) return res.status(404).json({error: 'book not found'});
        res.json(books);
    })
    */

    User.findOne({username: username}, function(err, user){
      if(err) return reject({error: err});
      if(!user) return reject({error: 'user not found'});
      resolve(user);
    })
  });
}


/**
 * Logs user into the system
 *
 * username String The user name for login
 * password String The password for login in clear text
 * returns String
 **/
exports.loginUser = function(username,password) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

/**
 * Logs out current logged in user session
 *
 * no response value expected for this operation
 **/
exports.logoutUser = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Updated user
 * This can only be done by the logged in user.
 *
 * body User Updated user object
 * username String name that need to be updated
 * no response value expected for this operation
 **/
exports.updateUser = function(body, username) {
  return new Promise(function(resolve, reject) {
    /*
    Book.findById(req.params.book_id, function(err, book){
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!book) return res.status(404).json({ error: 'book not found' });

        if(req.body.title) book.title = req.body.title;
        if(req.body.author) book.author = req.body.author;
        if(req.body.published_date) book.published_date = req.body.published_date;

        book.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.json({message: 'book updated'});
        });

    });
     */

    User.update({ username: username }, { $set: body }, function(err, output){
      if(err) return reject({ error: 'database failure' });

      console.log(output);

      if(!output.n) return reject({ error: 'book not found' });

      resolve( { message: 'book updated' } );
    })
  });
}
