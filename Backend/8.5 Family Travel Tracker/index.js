import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 5000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Kiran@123",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = -1;
let users = await getUsers();
  console.log(users);
  if(users.length > 0){
    currentUserId = users[0].id;
  }

// let users = [
//   { id: 1, name: "Angela", color: "teal" },
//   { id: 2, name: "Jack", color: "powderblue" },
// ];

async function checkVisited(userId) {
  const result = await db.query("SELECT country_code FROM visited_countries where user_id = $1", [userId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
async function getUsers(){
  const result = await db.query("SELECT * FROM users");
  return result.rows;
}
async function getUserById(userId){
  const result = await db.query("SELECT * FROM users where id = $1", [userId]);
  return result.rows;
}
async function getUserVisitedCountries(userId){
  const result = await db.query("SELECT country_code FROM visited_countries where user_id = $1",[userId]);
  return result.rows;
}
async function checkUserExists(name,color) {
  const result = await db.query("SELECT * FROM users where LOWER(name) = $1",[name.toLowerCase()]);
  console.log(result.rows);
  if(result.rows.length > 0){
    return true;
  }
  else{
    return false;
  }
}
app.get("/", async (req, res) => {
  let countries = [];
  const users = await getUsers();
  console.log(users);
  if(currentUserId !== -1){
    console.log("Current user: " + currentUserId);
    countries = await checkVisited(currentUserId);
    const user = await getUserById(currentUserId);
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: user[0].color,
    });
  }
  else{
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: 'teal',
    });
  }
});
app.post("/add", async (req, res) => {
  console.log(req.body);
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) = $1;",
      [input.toLowerCase()]
    );
    if(result.rows.length === 0){
      const countries = await checkVisited(currentUserId);
      const user = await getUserById(currentUserId);
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        color: user[0].color,
        error: "Invalid country name. Try again"
      });
    }
    else{
      const data = result.rows[0];
      const countryCode = data.country_code;
      try {
        await db.query(
          "INSERT INTO visited_countries (country_code,user_id) VALUES ($1, $2)",
          [countryCode,currentUserId]
        );
        res.redirect("/");
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  console.log(req.body);
  if(req.body.add){
    res.render("new.ejs");
  }
  else if(req.body.user){
    let countries = [];
    currentUserId = req.body.user;
    const users = await getUsers();
    const user = await getUserById(currentUserId);
    console.log("Current user:" + user[0].name + " Color: " + user[0].color);
    const visitedCountries = await getUserVisitedCountries(currentUserId);
    visitedCountries.forEach((country) => {
      countries.push(country.country_code);
    });
    console.log(countries);
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: user[0].color,
    });
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  console.log(req.body);
  const isUserExists = await checkUserExists(req.body.name, req.body.color);
  if(isUserExists){
    console.log("Provided user name is already assigned");
    res.send(`
      <script>
        alert('Provided user name or color is already assigned');
        window.location.href = '/'; // Redirect to another page after alert
      </script>
    `);
  }
  else{
    console.log("Adding new user...");
    let result = await db.query(
      "INSERT INTO users (name,color) VALUES ($1, $2) RETURNING id",
      [req.body.name, req.body.color]
    );
    currentUserId = result.rows[0].id;
    console.log("New user added: " + currentUserId);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
