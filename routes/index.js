const express = require("express");
const router = express.Router();
const myDB = require("../db/database.js");
const Passport = require("passport");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const Strategy = require("passport-local").Strategy;
const authUtils = require("../utils/auth");
const Session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGO_URL || "mongodb://localhost:27017";

app.use(cookieParser("cookie_secret"));
app.use(
  Session({
    secret: "cookie_secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(Passport.initialize());
app.use(Passport.session());

Passport.serializeUser((user, done) => {
  done(null, user._id);
});

Passport.deserializeUser((id, done) => {
  done(null, { id });
});

Passport.use(
  new Strategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      const client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = await client.db("postdb");
      const users = db.collection("users");

      users.findOne({ username }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }
        let newPass = authUtils.decrypt(user.password);
        if (password != newPass) {
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

router.post(
  "/signin",
  Passport.authenticate("local", {
    failureRedirect: "/login?error=Invalid username or password.",
  }),
  function (req, res) {
    res.redirect("/posts?username=" + req.user.username);
  }
);

router.post("/signup", async (req, res, next) => {
  const registrationParams = req.body;

  const users = await myDB.getUserDB();
  let user = req.body.username;
  await myDB.createLikes(user);

  if (
    registrationParams.password != registrationParams.passwordVerify ||
    registrationParams.username == "" ||
    registrationParams.password == ""
  ) {
    res.redirect("/register?error=Error creating account, fill all forms, ensure passwords match.");
  } else {
    const payload = {
      username: registrationParams.username,
      password: authUtils.encrypt(registrationParams.password),
    };

    users.findOne({ username: registrationParams.username }, function (
      err,
      user
    ) {
      if (err) {
        return next(err);
      }
      if (user) {
        res.redirect("/login?error=Username already exists.");
      } else {
        users.insertOne(payload, (err) => {
          if (err) {
            res.redirect("/login?error=Error signing in.");
          }
        });
        res.redirect("/login");
      }
    });
  }
});

// modified late to fix heroku
router.get("/postsFetch", async (req, res) => {
  const posts = await myDB.getPosts();
  res.json(posts);
});

router.get("/score", async (req, res) => {
  const posts = await myDB.getPostsByScore();
  res.json(posts);
});

// modified late to fix heroku
router.get("/likesFetch", async (req, res) => {
  const likes = await myDB.getLikes();
  res.json(likes);
});

router.post("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/?msg=You have been signed out.");
});

router.post("/delete", async (req, res, next) => {
  const users = await myDB.getUserDB();
  const info = req.body;
  await myDB.deleteLikes(info.username);

  users.findOne({ username: info.username }, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.redirect("/options?error=Internal error.");
    } else {
      users.deleteOne({
        username: info.username,
      });
      res.redirect("/?msg=Your account was deleted. Hope to see you again soon!");
    }
  });
});

router.post("/upvote", async (req, res) => {
  let title = req.body.title;
  let user = req.body.user;
  let date = req.body.date;
  await myDB.upvote(user, title, date);
  await myDB.addLike(user, title, date);
  res.redirect("/likes"); 
});

router.post("/downvote", async (req, res) => {
  let user = req.body.user;
  let title = req.body.title;
  let date = req.body.date;
  await myDB.downvote(user, title, date);
  await myDB.removeLike(user, title, date);
  res.redirect("/posts"); 
});

router.post("/deleteLike", async (req, res) => {
  let user = req.body.user;
  let title = req.body.title;
  let date = req.body.date;
  await myDB.downvote(user, title, date);
  await myDB.removeLike(user, title, date);
  res.redirect("/likes"); 
});

module.exports = router;
