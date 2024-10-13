import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const port = 5000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.post("/", async (req,res) => {
    try{
        console.log(req.body);
        const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single&contains=" + req.body.searchText);
        console.log(response.data);
        if(response.data.error){
            res.render("index.ejs", {
                joke : "Couldn't find a joke. Enter something else"
            });
        }
        else{
            res.render("index.ejs", {
                joke : response.data.joke
            });
        }
    }
    catch(error){
        console.log(error.message);
        res.render("index.ejs", {
            joke : "Something went wrong. Please try again"
        });
    }
});

app.listen(port, ()=> {
    console.log(`Started listening on port ${port}`);
})