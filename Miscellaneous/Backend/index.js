const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("you're in home page");
});

app.post("/register", (req, res) => {
    res.send("post request");
});

app.listen(port, () => {
    console.log(`app is listing on port ${port}`);
});