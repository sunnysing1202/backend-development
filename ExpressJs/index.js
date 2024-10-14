const express = require("express");
const app = express();

let port = 3000; 

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("hello, i am root!");
});

app.get("/about", (req, res) => {
    res.send("your'e in about page");
});

app.get("/contact", (req, res) => {
    res.send("you're in contact page");
});

app.get("*", (req, res) => {
    res.send("you're looking for the page isn't exist");
});

app.post("/search", (req, res) => {
    res.send("you are sending post request to search..");
});


// app.use((req, res) => {
//     // console.log(req);
//     console.log("request received");
//     // res.send("this is a basic response");
//     // res.send({
//     //     name: "apple",
//     //     color: "red",
//     // });
//     res.send("<h1>Hello</h1>");
// });