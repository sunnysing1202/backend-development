const express = require("express");
const app = express();
const port = 8080;
const { faker } = require("@faker-js/faker");
const mysql = require('mysql2');
const uuid = require("uuid");
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.use(express.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Nov23_2024',
    password: 'Sunny@MySQL@12'
});

let getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(), // before version 9.1.0, use userName()
        faker.internet.email(),
        faker.internet.password(),
    ];
}

// let q = "SHOW TABLES";

// let q2 = "INSERT INTO user2 (userId, userName, email, password) VALUES (?, ?, ?, ?)";
// let q2 = "INSERT INTO user2 (userId, userName, email, password) VALUES ?";
// let user = ["123", "newUser_12", "newuser2@gmailcom", "abc"];

// let users = [
//     ["123b", "newUser_12b", "newuser2b@gmailcom", "abcb"],
//     ["123c", "newUser_12c", "newuser2c@gmailcom", "abcc"]
// ];

// let data = [];
// for(let i = 1; i<= 100; i++) {
//     data.push(getRandomUser());
// }


// let getRandomUser = () => {
//     return {
//         id: faker.string.uuid(),
//         username: faker.internet.username(), // before version 9.1.0, use userName()
//         email: faker.internet.email(),
//         password: faker.internet.password(),
//     };
// }

console.log(getRandomUser());

//Home Route
app.get("/", (req, res) => {
    let q = `SELECT count(*) FROM user2`;
        try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let count = (result[0]["count(*)"]);
            res.render("home.ejs", { count });
        })
        } catch(err) {
        console.log(err);
        res.send("some error in DB");
        }

    // connection.end();
})

//Show User
app.get("/user", (req, res) => {
    let q = `SELECT * FROM user2`;
    try {
        connection.query(q, (err, users) => {
            if(err) throw err;
            console.log(users);
            res.render("showUsers.ejs", { users });
        })
    } catch(err) {
        console.log(err);
        res.send("some error in DB");
    }
})

//Edit Route
app.get("/user/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user2 WHERE userId='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let user = result[0];
            res.render("edit.ejs", { user });
        })
    } catch(err) {
        console.log(err);
        res.send("some error in DB");
    }
})

//Update Route
app.patch("/user/:id", (req, res) => {
    let { id } = req.params;
    let {password: formPass, username: newUsername} = req.body;
    let q = `SELECT * FROM user2 WHERE userId='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if(err) throw err;
            let user = result[0];
            if(formPass != user.password) {
                res.send("wrong password");
            } else {
                let q2 = `UPDATE user2 SET username = '${newUsername}' WHERE userId ='${id}'`;
                connection.query(q2, (err, result) => {
                    if(err) throw err;
                    res.redirect("/user");
                })
            }
        })
    } catch(err) {
        console.log(err);
        res.send("some err in DB");
    }
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})