//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");



const app = express();



app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


mongoose.connect("mongodb://localhost:27017/blogPostDB", { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
});

const Post = mongoose.model("Post", postSchema);


// const holders = [];
// Post.find({}, (err, post) => {
//     if (err) {
//         console.log("error")
//     } else {
//         holders.push(post);
//     }
// })


app.get("/", (req, res) => {
    Post.find({}, (err, post) => {
        if (err) {
            console.log("Post not published");
        } else {
            res.render("home", {
                posts: post,
            })
        }
    })
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/about", (req, res) => {
    res.render("about");
})

app.get("/compose", (req, res) => {
    res.render("compose");
});

app.post("/compose", (req, res) => {

    const title = req.body.title;
    const image = req.body.image;
    const content = req.body.content;

    //Saving Post to Database
    const post = new Post({
        title: title,
        image: image,
        content: content,
    });

    post.save();
    res.redirect("/");
});



// app.get("/posts/:postTitle", (req, res) => {

//     const requestedTitle = _.lowerCase(req.params.postTitle);

//     holders.forEach((holder) => {
//         const storedTitle = _.lowerCase(holder.title);

//         if (storedTitle === requestedTitle) {
//             res.render("post", {
//                 title: holder.title,
//                 content: holder.content,
//                 image: holder.image,
//             });
//         } else {
//             console.log("error");
//         }
//     });

// });






app.listen(3000, () => {
    console.log("Server running on port 3000")
});