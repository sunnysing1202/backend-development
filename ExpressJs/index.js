const express = require("express");
const app = express();

const port = 8080;

app.get("/", (req, res) => {
    res.send("Hey there");
})

app.post("/register", (req, res) => {
    res.send("now you're in register");
})

app.get("/about", (req, res) => {
    console.log(req.body);
})

app.listen(port, () => {
    console.log(`app is listing on port ${port}`);
})