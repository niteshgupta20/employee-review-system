const express = require('express');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('./config/passportLocalStrategy');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');
const app = express();
const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(expressLayouts);
app.set('layout', 'layout');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

app.use(
  session({
    name: 'employee',
    secret: 'blahblah',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new mongoStore(
      {
        mongooseConnection: db,
        autoRemove: 'disabled',
      },
      function (error) {
        console.log(error || 'connect-mongodb setup ok');
      }
    ),
  })
);

app.use(express.static('./assets'));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMiddleware.setFlash);

// routes
app.use('/', require('./routes/index'));

app.listen(PORT, function () {
  console.log(`Server is up and running on PORT ${PORT}`);
});
