const mongoose = require("mongoose");

main()
    .then((res) => {
        console.log("connection successful");
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/flipkart");
}

const gadgetSchema = new mongoose.Schema({
    title: {
        type: String,
        maxLength: 20,
        required: true,
    },
    brand: {
        type: String,
    },
    price: {
        type: Number,
        min: 1,
    },
    discount: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        enum: ["apple", "samsung"],
    },
})

const Gadget = mongoose.model("Gadget", gadgetSchema);

const gadget4 = new Gadget({
    title: "glaxy11pro",
    brand: "sumsung",
    price: 80000,
    category: "samsung",

});

// gadget4.save()
// .then((res) => {
//     console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// })