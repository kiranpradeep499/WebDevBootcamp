import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "Kiran@123",
  port: 5432,
});
db.connect();

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", async (req, res) => {
  let listItems = [];
  const result = await db.query("SELECT * FROM items order by id ASC");
  result.rows.forEach(item => listItems.push({
    id: item.id,
    title: item.item
  }));
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: listItems,
  });
});

app.post("/add", async (req, res) => {
  try{
    console.log(req.body);
    await db.query("INSERT INTO items (item) VALUES ($1)",[req.body.newItem]);
  }
  catch(error){
    console.error("Error occurred while inserting into table", error);
  }
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  try{
    console.log(req.body);
    await db.query("UPDATE items set item = $1 where id = $2",[req.body.updatedItemTitle, req.body.updatedItemId]);
  }
  catch(error){
    console.error("Error occurred while updating table", error);
  }
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  try{
    console.log(req.body);
    await db.query("DELETE FROM items where id = $1",[req.body.deleteItemId]);
  }
  catch(error){
    console.error("Error occurred while updating table", error);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
