const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/ig/:username", (req, res) => {
    let {username} = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    if(data) {
        res.render("instagram.ejs", {data});
    } else {
        res.status(404).send("user not found!!");
    }
        
});

app.get("/about", (req, res) => {
    res.send("it is intresting that you want to explore more...");
});

app.get("*", (req, res) => {
    res.send("oops!!");
});

app.listen(port, () => {
    console.log(`app is listening on ${port}`);
});