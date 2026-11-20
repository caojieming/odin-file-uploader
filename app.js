// load .env file if it exists
process.loadEnvFile();

const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const expressSession = require("express-session");
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');

const passport = require("./auth/authController");
const { prisma } = require('./lib/prisma.js');


const pool = new Pool({
  // add your configuration
  connectionString: process.env.DATABASE_URL
});

// standard express app setup
const app = express();

// let code know we're using ejs as template engine as well as location of views folder
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// setup path to static assets
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// persists sessions in the database (whatever that means)
app.use(
  expressSession({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      prisma,
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);

// middleware setup
// app.use(expressSession({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.expressSession());
app.use(express.urlencoded({ extended: false }));

// allows user to be stored as currentUser in locals, so you won’t have to manually pass it into all of the controllers in which you need it (just reference locals.currentUser)
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// import + use routers
const indexRouter = require("./routes/indexRouter");
app.use("/", indexRouter);



// open web server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`listening on port ${PORT}`);
});
