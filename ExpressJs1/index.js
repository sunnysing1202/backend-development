const express = require("express");
const app = express();

console.log(app.dir);

app.get("/", (req, res) => {
    res.send("hey Sunny");
});

app.get("/about", (req, res) => {
    res.send("the about section contains GET request");
});

app.get(":ig/id", (req, res) => {
    res.send("exploring id");
});


const port = 3000;

app.listen(port, () => {
    console.log(`app is listing on port ${port}`);
});