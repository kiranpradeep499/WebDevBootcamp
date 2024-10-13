import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 5000;

app.listen(port, () => {
    console.log(`Started listening port ${port}`);
});

app.get("/", (req,res) => {
    let d = new Date();
    let day = d.getDay();
    let isWeekday = true;
    if(day === 0 || day === 6){
        isWeekday = false;
    }
    console.log(day);
    res.render(__dirname + "/views/index.ejs", {
        isWeekday : isWeekday
    });
});


