import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 5000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secret",
  password: "Kiran@123",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  try{
    const email = req.body.username;
    const password = req.body.password;
    if(!email || !password){
      console.error("Entered credentials cannot be empty!");
    }
    else{
      await db.query("INSERT INTO users (email,password) values ($1,$2)", [email, password]);
      res.render("secrets.ejs");
    }
  }
  catch(error){
    console.error("Couldn't register user",error);
    res.redirect("/");
  }
  
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  if(!email || !password){
    console.error("Entered credentials cannot be empty!");
  }
  else{
    const result = await db.query("SELECT FROM users WHERE email = $1 AND password = $2", [email, password]);
    if(result.rows.length == 1){
      res.render("secrets.ejs");
    }
    else{
      res.send("Invalid login credentials");
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
