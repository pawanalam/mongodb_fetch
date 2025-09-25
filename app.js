const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const path = require("path");

// exports file 
const mongooseMdl = require("./data/db");
const { log, error } = require("console");
const { render } = require("ejs");
const router=require("./router/router")

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyparser.urlencoded({ extended: true }));
//serve the css and js file
app.use("/static", express.static('static'))
app.use(router)

// after localhost:9000/newfile your save data is show to you

app.listen(9000, () => {
    console.log("connect with server...", 9000);
});




