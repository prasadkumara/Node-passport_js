const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/user');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
// debugger
  router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
 router.get('/register', forwardAuthenticated, (req, res) => res.send('register'));

// Register
router.post('/register', (req, res) => {
  console.log("call registration")
  const { name,lastname, email, password, password2,gender,address,dob,status,Isclient } = req.body;
  let errors = [];

  if (!name || !lastname || !email || !password || !password2 || !gender || !address || !dob || !status || !Isclient) {
    res.send("RegistrationError")
    console.log("Error")
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      lastname,
      email,
      password,
      password2,
      gender,
      address,
      dob,
      status,
      Isclient
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          // errors,
          // name,
          // email,
          // password,
          // password2,
          // nic
          errors,
          name,
          lastname,
          email,
          password,
          password2,
          gender,
          address,
          dob,
          status,
          Isclient
        });
      } else {
        const newUser = new User({
          // name,
          // email,
          // password,
          // nic
          name,
          lastname,
          email,
          password,
          password2,
          gender,
          address,
          dob,
          status,
          Isclient
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'             
                );
                res.send("SuccessRegistration")
                console.log("You are now registered and can log in")
                // res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login',
  passport.authenticate('local'),
  function(req, res) {

    if(res){  
      console.log(req.user)
      res.status(200).send(req.user)
      console.log("success")
      
    }else{
      
    //res.status(404).send("unsuccess")
    console.log(req)
    console.log("Unsuccess")}
    res.end();
    
  });


// Logout
router.get('/logout', (req, res) => {
  console.log("logout")
  req.logout();
  res.send("logout")
});

module.exports = router;

