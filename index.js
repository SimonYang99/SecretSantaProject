require('dotenv').config();

const fs = require("fs");
const engine = require("consolidate");
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const db = require("./modules/database");
const randomstring = require("randomstring");
const hbs = require("hbs");
const randomizer = require("./modules/randomizer");
const mailer = require("./modules/mailer");

hbs.registerHelper('json', function(contect){
    return JSON.stringify(context);
});

const badStrings = fs.readFileSync(`${__dirname}/naughtyStrings.txt`);
const app = express();
const port = process.env.PORT || 8080;

app.set("views", `${path.join(__dirname, "/views")}`);
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.engine("html", engine.mustache);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("index.hbs");
});

app.get("/room/:user/:id", async function(req, res) {
    db.get_users(req.params.id).then((resolve) => {
        console.log(resolve.rows.length)
        if(resolve.rows.length === 0){
            res.redirect("/");
        }
        else{
            let host = (req.params.user === "host")? true : false;
            console.log(host);
            res.render("room.hbs", {
                room : req.params.id,
                people: resolve.rows,
                host: host
            });
        }
    });
});

app.post("/host", (req, res) => {
    console.log(req.body);
    let room = randomstring.generate(10);
    if(!checkBadstring(req.body.name)){
        db.create_user(req.body.name, req.body.email, room);
        res.send({status : "OK", room: room});
    }
    else{
        res.send({status: "ERROR: Bad Name"});
    }

});

app.post("/join", (req, res) => {
    console.log(req.body);
    if(!checkBadstring(req.body.name)){
        db.create_user(req.body.name, req.body.email, req.body.room);
        res.send({status : "OK", room: req.body.room});
    }
    else{
        res.send({status: "ERROR: Bad Name"});
    }
});

app.post("/start", (req, res) => {
    console.log(req.body);
    db.get_users(req.body.room).then((resolve) => {
        randomizer.randomizeNames(resolve.rows, resolve.rows.slice(0)).then(async (resp) => {
            mailer.mailList(resp).then((resolve2) => {
                
            });
            await db.delete_room(req.body.room);
            res.send({status : "OK", room: req.body.room});
        });
    });
});


app.listen(port, () => {
    console.log(`Server started at http://localhost: ${ port }`);
});

function checkBadstring(name){
    if(badStrings.includes(name)){
        return true;
    }
    else{
        return false;
    }
}