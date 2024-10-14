import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const dbClient = new pg.Client({
	user: 'postgres',
	password: 'Kiran@123',
	host: 'localhost',
	port: 5432,
	database: 'world',
});
dbClient.connect();



app.get("/", async (req, res) => {
  //Write your code here.
  let countries = [];
  try{
    const result = await dbClient.query('SELECT country_code FROM visited_countries;');
    result.rows.forEach(item => countries.push(item.country_code));
    console.log(countries);
  }
  catch(error){
    console.error('Error while reading from DB', error);
  }
  res.render("index.ejs", {
    countries:countries,
    total : countries.length
  })
});

app.post("/add", async(req, res)=> {
  console.log(req.body);
  const isExists = checkCountry(req.body.country.trim());
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

async function checkCountry(country){
  try{
    const result = await dbClient.query('SELECT country_code FROM counties where LOWER(country_name) = $1;');
    result.rows.forEach(item => countries.push(item.country_code));
    console.log(countries);
  }
  catch(error){
    console.error('Error while reading from DB', error);
  }
}
