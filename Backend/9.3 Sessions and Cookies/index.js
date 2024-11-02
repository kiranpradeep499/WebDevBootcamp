import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

const app = express();
const port = 5000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
  secret: "TOPSECRET",
  resave:false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secret",
  password: "Kiran@123",
  port: 5432,
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  console.log("Getting login page...");
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  console.log("Getting registration page...");
  res.render("register.ejs");
});

app.get("/secrets", (req,res) => {
  console.log("Secrets endpoint hit");
  if(req.isAuthenticated()){
    console.log("isAuthenticated: true");
    res.render("secrets.ejs");
  }
  else{
    console.log("isAuthenticated: false");
    res.redirect("/login");
  }
})

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  console.log("Registering user...");
  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          //res.render("secrets.ejs");
          req.login(user, (err)=> {
            console.log(err);
            res.redirect("/secrets");
          })
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login"
}));

passport.use(new Strategy(async function verify(username, password, cb){
  console.log("Verifying using Passport: " + username);
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return cb(err);
        } else {
          if (result) {
            //res.render("secrets.ejs");
            console.log("Authentication success...returning user");
            return cb(null, user);
          } else {
            //res.send("Incorrect Password");
            console.log("Authentication failed...");
            return cb(null, false);
          }
        }
      });
    } else {
      //res.send("User not found");
      return cb("User not found");
    }
  } catch (err) {
    console.log(err);
    cb(err);
  }
}));

passport.serializeUser((user,cb) => {
  console.log("Entered serialize function");
  cb(null, user);
});

passport.deserializeUser((user,cb) => {
  console.log("Entered deserialize function");
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
