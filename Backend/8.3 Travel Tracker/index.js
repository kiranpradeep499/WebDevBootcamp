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
  let countries = await checkVisited();
  res.render("index.ejs", {
    countries:countries,
    total : countries.length
  })
});

app.post("/add", async(req, res)=> {
  try{
    console.log(req.body);
    let result = await getCountryCode(req.body.country.trim());
    if(result.length === 1){
        console.log("Country code found");
        console.log(result[0].country_code)
        try{
          await dbClient.query('INSERT INTO visited_countries (country_code) values ($1)',[result[0].country_code]);
          res.redirect("/");
        }
        catch(error){
          console.error("Insertion failed", error);
          let countries = await checkVisited();
          res.render("index.ejs",{
            countries:countries,
            error: "Country has already been added. Try again",
            total : countries.length
          });
        }
    }
    else{
      console.log("Country code not found :(...");
      let countries = await checkVisited();
      res.render("index.ejs",{
        countries:countries,
        error: "Country doesn't exist. Try again",
        total : countries.length
      });
    }
  }
  catch(error){
    console.error("Error while adding country:", error);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

async function getCountryCode(country){
  try{
    const result = await dbClient.query('SELECT country_code FROM countries where LOWER(country_name) = $1;',[country.toLowerCase()]);
    console.log(result.rows);
    return result.rows;
  }
  catch(error){
    console.error('Error while reading from DB', error);
    return [];
  }
}
async function checkVisited(){
  let countries = [];
  try{
    const result = await dbClient.query('SELECT country_code FROM visited_countries;');
    result.rows.forEach(item => countries.push(item.country_code));
    console.log(countries);
    return countries;
  }
  catch(error){
    console.error('Error while reading from DB', error);
    return [];
  }
}
