// setTimeout(() => {
//     console.log("hey, after 2 sec");
// }, 5000);

// console.log("before you");

//* normal color change function

// h1 = document.querySelector("h1");

// function changeColor(color, delay, nextColorChange) {
//     setTimeout(() => {
//         h1.style.color = color;
//         if(nextColorChange) nextColorChange();
//     }, delay);
    
// }

// changeColor("red", 1000, () => {
//     changeColor("orange", 1000, () => {
//         changeColor("green", 1000, () => {
//             changeColor("pink", 1000);
//         });
//     });
// });

//* refactored code => async functions

h1 = document.querySelector("h1");

function changeColor(color, delay, nextColorChange) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let num = Math.floor(Math.random() * 10) + 1;
            if(num > 3) {
                reject("promise was rejected");
            }

            h1.style.color = color;
            console.log(`color changed to ${color}`);
            resolve("color changed");
        }, delay);
    }); 
}

// changeColor("red", 1000)
// .then((result) => {
//     console.log("red color was completed");
//     console.log("result : ", result);
//     return changeColor("blue", 4000);
// })
// .then((result) => {
//     console.log("blue color was completed");
//     console.log("result : ", result);
// })
// .catch((error) => {
//     console.log("somthing is wrong");
//     console.log("error : ", error);
// })

//* using await keyword

async function demo() {
    try {
        await changeColor("red", 1000);
        await changeColor("blue", 1000);
        await changeColor("green", 1000);
        await changeColor("pink", 1000);
        await changeColor("grey", 1000);
    } catch(err) {
        console.log("error caught!");
        console.log(err);
    }

    let a = 5;
    console.log(a);

    let num = a + 5;
    console.log(num);
}


//! Normal saveToDb function

// function saveToDb(data, success, faliure) {
//     let internetSpeed = Math.floor(Math.random() * 10) + 1;
//     if(internetSpeed > 4) {
//         success();
//     } else {
//         faliure();
//     }
// }

// saveToDb("sunny", () => {
//     console.log("your data was saved ");
//     saveToDb("hello world", () => {
//         console.log("success2");
//     }, () => {
//         console.log("failure2");
//     })
// }, () => {
//     console.log("connection weak, data lost");
// });

//! async function using Promise

// function saveToDb(data) {
//     return new Promise((resolve, reject) => {
//         let internetSpeed = Math.floor(Math.random() * 10) + 1;
//         if(internetSpeed > 4) {
//             resolve("success message");
//         } else {
//             reject("failure message");
//         }

//     })
// }

// saveToDb("sunny");


// saveToDb("sunny")
// .then((result) => {
//     console.log("result : ", result);
//     console.log("data1 save.");
//     return saveToDb("hello world")
// })
// .then((result) => {
//     console.log("result : ", result);
//     console.log("data2 saved");
//     return saveToDb("gautam");
// })
// .then((result) => {
//     console.log("result : ", result);
//     console.log("data3 saved");
// })
// .catch((error) => {
//     console.log("error : ", error);
//     console.log("promise was rejected");
// })


//* async function

// async function greet() {
//     throw "404 page not found";
//     return "hello";
// }

// greet()
// .then((result) => {
//     console.log("promise was resolved");
//     console.log("result was : ", result);
// })
// .catch((err) => {
//     console.log("promise was redected with err : ", err);
// })

// let demo = async () => {
//     return 5;
// }

//! using await

// function getNumber() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             let num = Math.floor(Math.random() * 10) + 1;
//             console.log(num);
//             resolve();
//         }, 1000);
//     })
// }

// async function demo() {
//     await getNumber();
//     await getNumber();
//     await getNumber();
//     await getNumber();
//     await getNumber();
//     await getNumber();
//     await getNumber();
//     await getNumber();
//     await getNumber();
// }