const express = require('express');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts')
require('dotenv').config()
const methodOverride = require('method-override')
const {Login} = require('./models')
const session = require("express-session")
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))

app.use(express.static('public'));

// app.use(expressLayouts)
// app.set('layout', './layouts/LoginPage')


app.use(session({
	secret: 'super top secret',
	resave: false,
	saveUninitialized: true,
  }))

  app.use(async (req, res, next) => {
    if (req.session.userId) {
      res.locals.currentUser = await Login.findOne({
        where: {
          id: req.session.userId
        }
      })
    } else {
      res.locals.currentUser = undefined
    }
    res.locals.errorMessage = []
    next()
  })

const indexRouter = require('./routers/index.js')
app.use('/', indexRouter)

const loginRouter = require('./routers/Login.js')
app.use('/Login', loginRouter)

const messageRouter = require('./routers/message.js')
app.use('/sendMessage', messageRouter)

const logoutRouter = require('./routers/logout.js')
app.use('/logout', logoutRouter)

  app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

