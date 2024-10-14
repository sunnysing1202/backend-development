const express = require("express");
const app = express();

let port = 3000; 

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("hello, i am root!");
});

// path parameters
app.get("/:username/:id", (req, res) => {
    let { username, id } = req.params;
    let htmlStr = `<h1>welcome to the page of @${username}!</h1>`
    res.send(htmlStr);
})

//query strings
app.get("/search", (req, res) => {
    let {q} = req.query;
    if(!q) {
        return res.send("<h1>nothing searched</h1>");
    }
    res.send(`<h1>search results for query : ${q}.</h1>`);
});
