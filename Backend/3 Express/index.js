import express from "express";
const app = express();
const port = 8080;
app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});
app.get("/", (req,res) => {
    res.send("<h1>Hello world</h1>");
});
app.get("/about", (req,res) => {
    res.send("<h1>About page</h1>");
});
app.get("/contact", (req,res) => {
    res.send("<h1>Contact Me</h1>");
});