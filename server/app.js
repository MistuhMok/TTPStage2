// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const db = require('../db');
const session = require('express-session');
const passport = require('passport');

// passport registration
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Setup logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//json parser
app.use(bodyParser.json());

app.use(
  session({
    secret: 'secret',
    // store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Serve static assets
app
  .use(express.static(path.resolve(__dirname, '..', 'build')))
  // Serve our api
  .use('/api', require('./api'));

app.use('/auth', require('./auth'));
app.use('/stocks', require('./stocks'));

// Always return the main index.html, so react-router render the route in the client
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });

module.exports = app;
