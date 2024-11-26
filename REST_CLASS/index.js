const express = require("express");
const app = express();
const port = 8080;
const path = require("path");//require path
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const mysql = require('mysql2');

app.use(express.urlencoded({extended: true})); //to parsing data that comes from POST request
app.use(methodOverride("_method"));

app.set("view engine", "ejs"); //setting up my view engine
app.set("views", path.join(__dirname, "views")); //setting path for views folder
app.use(express.static(path.join(__dirname, "public"))); //accessing public folder which is in static mode i.e
// static file like css, fonts, etc.

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'quora_post',
    password: 'Sunny@MySQL@12'
});

// connecting to databse
connection.connect((err) => {
    if(err) {
        console.error(`unable to connect databse `, err);
        return;
    }
    console.log('successfully connected to DB');
})

//root route and it get redirected to /posts
app.get("/", (req, res) => {
    res.redirect("/posts");
})

// Route to show the new post form
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// Route to create a new post
app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    const id = uuidv4();
    const insertQuery = 'INSERT INTO posts (id, username, content) VALUES (?, ?, ?)';

    connection.query(insertQuery, [id, username, content], (err, result) => {
        if (err) {
            console.log("Error in insertion:", err);
            return res.status(500).send("Error creating post");
        }

        // After successful insertion, redirect to posts page
        // No need to fetch all posts here since we're redirecting
        res.redirect("/posts");
    });
});

// Route to display all posts
app.get("/posts", (req, res) => {
    const q = 'SELECT * FROM posts ORDER BY createdAt ASC';

    try {
        connection.query(q, (err, blogs) => {
            if(err) throw err;
            console.log(blogs);
            res.render("index.ejs", { blogs });
        })
    } catch(err) {
        console.log(err);
        res.send("some error in DB");
    }
});


// app.get("/posts/:id", (req, res) => {
//     const q = `SELECT * FROM posts`;
//     try {
//         connection.query(q, (err, blog) => {
//             if(err) throw err;
//             console.log(blog);
//             res.render("show.ejs", { blog })
//         })
//     } catch(err) {
//         console.log(err);
//         res.send("somme error in DB");
//     }
//
// })



app.get("/posts/:id", (req, res) => {
    const postId = req.params.id;
    const q = `SELECT * FROM posts WHERE id = ?`;
    try {
        connection.query(q, [postId], (err, blog) => {
            if(err) throw err;

            // blog is an array, so you need to access the first item
            if (blog.length > 0) {
                res.render("show.ejs", { blog: blog[0] });
            } else {
                res.status(404).send("Post not found");
            }
        });
    } catch(err) {
        console.log(err);
        res.status(500).send("Some error in DB");
    }
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    const q = `UPDATE posts SET content = ? WHERE ID = ?`;

    try {
        connection.query(q, [newContent, id], (err, blog) => {
            if(err) throw err;
            console.log(blog);
            res.redirect("/posts");
        })
    } catch(err) {
        console.log(err);
        res.send("some error while editing :( ");
    }

})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    const q = `SELECT * FROM posts WHERE id = ?`;

    try {
        connection.query(q, [ id ], (err, blogs) => {
            if(err) throw err;

            res.render("edit.ejs", { blog : blogs[0] });
        })
    } catch(err) {
        console.log(err);
        res.send("some error occured");
    }
})

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    const q = `DELETE FROM posts WHERE id = ?`;

    try {
        connection.query(q, [ id ], (err, blog) => {
            if(err) throw err;
            res.redirect("/posts");
        })
    } catch(err) {
        console.log(err);
        res.send("some error while deleting");
    }
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})