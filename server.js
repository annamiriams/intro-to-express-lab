// the first three exercises came fairly easily to me, though some google searches helped in refreshing my knowledge and ability to use isNaN and .length. for the fourth exercise, i got so stuck and asked for additional support during support time. the group talked through multiple ways of tackling the exercise and ultimately i went down a path that made the most sense to me and was most similar to how i'd originally conceptualized the solution. 

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
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
    const index = req.params.index;
    if (index > 0 && index < collectibles.length) {
        res.send(`So, you want the ${collectibles[index].name}? For ${collectibles[index].price}, it can be yours!`);
    } else {
        res.send(`This item is not yet in stock. Check back soon!`);
    }
});

// ---------------------------------------------------

// Exercise 4: Filter Shoes by Query Parameters

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    // thanks to dallas for (re)teaching me about spread syntax. this allows us to easily copy the entire shoes array into a new array called filteredShoes. i think this also allows us to not override the original shoes array every time we update filteredShoes (if we just did let filteredShoes = shoes, then every time filteredShoes was updated, we would also update the shoes array). ???
    let filteredShoes = [...shoes];
    
    // create variables to hold each of the queries (/shoes&min-price= or /shoes&max-price= or /shoes&type= ) so we don't have to rewrite this over and over again 
    // during support time we were also talking about Number() to convert min-price and max-price to numbers. but i can't figure out why that's needed because this still seems to be working for me without that
    const minPrice = req.query['min-price'];
    const maxPrice = req.query['max-price'];
    const type = req.query.type;
    // i still don't understand why the lab asks us to use kabob case for the price queries, but thanks to support time collaboration i now understand that 1) that's not typical, and 2) brackets are needed to correctly grab the queries for min or max price. if we were to req.query.min-price it reads it as "req.query.min - [MINUS] price" which is obvi not what we want. 

    // if min-price is included in the query (i.e. "minPrice is true [/included]"), filter through the array and update filteredShoes to an array that only includes shoes with a min-price that is greater than or equal to the min-price in the query
    if (minPrice) {
        // filter through each shoe for a shoe price that is greater than or equal to minPrice
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    };

    // if max-price is included in the query (i.e. "maxPrice is true [/included]"), filter through the array and update filteredShoes to an array that only includes shoes with a max-price that is less than or equal to the max-price in the query
    if (maxPrice) {
        // filter through each shoe for a shoe price that is less than or equal to maxPrice
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    };

    // if type is included in the query (i.e. "type is true [/included]"), filter through the array and update filteredShoes to an array that only includes shoes with a type that explicitly equals the type in the query
    if (type) {
        // filter through each shoe for a shoe type that explicitly equals the type in the query
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    };

    // res.send the updated filteredShoes array to include only what was caught in the above if statements
    res.send(filteredShoes);
});

// ---------------------------------------------------

// listen for requests here:

app.listen(3000, () => {
    console.log('Listening at port 3000.')
});

// ---------------------------------------------------
