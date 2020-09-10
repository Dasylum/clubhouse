var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

var flash = require('connect-flash');
app.use(flash());

var path = require('path');
var bcrypt = require('bcryptjs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var usermodel = require('./models/user');
var postmodel = require('./models/post');

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://NewDiet:Ds8764082465@cluster0.sbfkl.mongodb.net/clubhouseDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

passport.use(
    new LocalStrategy((username, password, done) => {
      usermodel.findOne({ username: username }, (err, user) => {
        if (err) { 
          return done(err);
        };
        if (!user) {
          return done(null, false, { msg: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if(res) {
            return done(null, user)
          }

          else {
            return done(null, false, { message: 'Incorrect Password' })
          }
        })
      });
    })
);

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    usermodel.findById(id, function(err, user) {
        done(err, user);
    });
});

var signuproute = require('./routes/signuproute');
var loginroute = require('./routes/loginroute')(passport);
var createpostroute = require('./routes/createpostroute');
var displayposts = require('./routes/displaypostsroute');
var membership = require('./routes/membershiproute');
var admin = require('./routes/adminroute');
var deletePost = require('./routes/deletepostroute');

app.use('/create-post', createpostroute);

app.use('/delete-post', deletePost);

app.use('/admin-status', admin);

app.use('/signup', signuproute);

app.use('/login', loginroute);

app.use('/catalog', displayposts);

app.get('/', (req, res) => {
    res.redirect('/catalog');
})

app.use('/membership-status', membership);

app.get('/log-out', (req, res) => {
    req.logout();
    res.redirect('/');
})

app.listen(8000, (req, res) => {
    console.log('Clubhouse application server running on port 8000...');
})

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});