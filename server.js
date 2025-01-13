// For each section in this lab, you will create an Express route that accepts requests at a specific URL and responds with res.send.

// import Express
const express = require('express');

// create an express application
const app = express();

// ---------------------------------------------------

// Exercise 1: Be Polite, Greet the User

app.get('/greetings/:username', (req, res) => {
    res.send(`Hello there, ${req.params.username}!`);
});

// ---------------------------------------------------

// Exercise 2: Rolling the Dice

app.get('/roll/:number', (req, res) => {
    const number = req.params.number;
    if (isNaN(number)) {
        res.send(`${number} is not a number. You must specify a number.`);
    } 
    else {
        const rolledNum = Math.floor(Math.random() * `${number}`);
        res.send(`You rolled a ${rolledNum}.`); 
    }
});

// ---------------------------------------------------

// Exercise 3: I Want THAT One!

app.get('/collectibles/:index', (req, res) => {
    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
    ];

    const index = req.params.index;
    if (index > 0 && index < collectibles.length) {
        res.send(`So, you want the ${collectibles[index].name}? For ${collectibles[index].price}, it can be yours!`);
    } else {
        res.send(`This item is not yet in stock. Check back soon!`);
    }
});

// ---------------------------------------------------

// Exercise 4: Filter Shoes by Query Parameters

app.get('/shoes', (req, res) => {
    const shoes = [
        { name: "Birkenstocks", price: 50, type: "sandal" },
        { name: "Air Jordans", price: 500, type: "sneaker" },
        { name: "Air Mahomeses", price: 501, type: "sneaker" },
        { name: "Utility Boots", price: 20, type: "boot" },
        { name: "Velcro Sandals", price: 15, type: "sandal" },
        { name: "Jet Boots", price: 1000, type: "boot" },
        { name: "Fifty-Inch Heels", price: 175, type: "heel" }
    ];

    
});

// ---------------------------------------------------

// listen for requests here:

app.listen(3000, () => {
    console.log('Listening at port 3000.')
});

// ---------------------------------------------------
