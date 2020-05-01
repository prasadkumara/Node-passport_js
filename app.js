const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cors = require('cors')
const bodyParser = require('body-parser') ;



const app = express();
// let server = require('http').Server(app);
app.use(cors())

// Passport Config
require('./config/passport')(passport);


// Connect to MongoDB
mongoose.connect('<mongodb connection string>', {
    useNewUrlParser: true
}, function (err) {
    if (err) {
        console.log('Connection to database unsuccessful..!!!');
        return;
    }
    console.log('Connection to database successful..!!!');
})

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// // Express body parser
// app.use(express.urlencoded({ extended: true }));

//bodypaser setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));


const PORT = process.env.PORT || 33291;

// server.listen(PORT, console.log(`Server started on port ${PORT}`));

 app.listen(PORT, console.log(`Server started on port ${PORT}`));
