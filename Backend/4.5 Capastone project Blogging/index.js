import express from "express";
import bodyParser from "body-parser"

const port = 5000;
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

let blogs = [{
    title: "Blog Post 1",
    content : "This is my first blog post"
},
{
    title: "Blog Post 2",
    content : "This is my second blog post"
}];

app.get("/", (req,res) => {
    res.render("index.ejs",{
        blogs:blogs
    });
});

app.get("/add-blog", (req,res) => {
    res.render("add-blog.ejs");
});

app.post("/add-blog", (req,res) => {
    console.log(req.body);
    blogs.push({
        title: req.body.blogTitle,
        content: req.body.blogContent
    });
    res.redirect("/");
});

app.delete("/delete-blog", (req,res)=>{
    console.log(req.body);
    console.log("Delete button clicked");
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Started listening on ${port}`);
})