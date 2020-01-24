
const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const bodyParser = require('body-parser')

// DB
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const settings = require("./server/config/settings.json")
const connectToDb = require("./server/config/db")

// Routes
const loginRoutes = require('./server/api/loginRoutes')
const userRoutes = require('./server/api/userRoutes')
const articleRoutes = require('./server/api/articleRoutes')
const dogRoutes = require('./server/api/dogRoutes')
const photoRoutes = require('./server/api/photoRoutes')

connectToDb()

const app = express()

app.use(bodyParser.json())

global.salt = settings.salt

app.use(
  session({
    secret: settings.cookieSecret,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({
      mongooseConnection: global.db,
    }),
  }),
)

app.use(loginRoutes, userRoutes, articleRoutes, dogRoutes, photoRoutes)


//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 9000
app.listen(port)
console.log(`app is listening on port: ${port}`)