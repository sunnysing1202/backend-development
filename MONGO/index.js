const mongoose = require("mongoose");

main()
    .then((res) => {
        // console.log(res);
        console.log("connection successful");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
})



const Student = mongoose.model("Student", studentSchema);

const student1 = new Student({ name: "Cyan", email: "cyan@gmail.com", age: 19});
const student2 = new Student({name: "adam", email: "adam@yahoo.in", age: 21});

const student3 = new Student({
    name: "Sheela",
    email: "sheela@gmail.com",
    age: 20,
})

// student3.save()
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
//
// Student.insertMany([
//     {name: "Rahul", email: "rahul@gmail.com", age: 18},
//     {name: "Ratan", email: "ratan@gmail.com", age: 20},
//     {name: "Amal", email: "amal@gmail.com", age: 20},
// ]).then((res) => {
//     console.log(res);
// })

Student.find({_id: {$eq: "6747044777cee1bedb68abb8"}}).then((res) => {
    console.log(res);
})

//update
Student.updateOne({name: "Ratan"}, {age: 29}).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})

Student.findOneAndUpdate({name: "Ratan"}, {age: 22}, {new: true})
.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log(err);
})

//Delete
Student.deleteOne({name: "Amal"})
.catch((res) => {
    console.log(res);
})
.catch((err) => {
    console.log(err);
})