import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { name } from "ejs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.render(__dirname + "/views/index.ejs");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  const nameLength = req.body.fName.length + req.body.lName.length;
  console.log(nameLength);
  res.locals.nameLength = nameLength;
  res.render(__dirname + "/views/index.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
