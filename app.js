const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require("path");
const flash = require('connect-flash');
const session = require('express-session');
var MongoStore = require("connect-mongo");

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public/")));
// Express sessionn
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
       mongoUrl: 'mongodb://localhost/blogmakenode' ,
    }),
    //session expires after 3 hours
    cookie: { maxAge: 60 * 1000 * 60 * 3 },
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
app.use('/', require('./routes/dashboard.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
