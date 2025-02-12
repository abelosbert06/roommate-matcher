import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
require('dotenv').config();

const dbUsername = credentials.env.DB_USERNAME;
const dbPassword = credentials.env.DB_PASSWORD;

const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.listen(port, () => {
    console.log(`currently listening to the port ${port}`);
})

app.get("/", (req, res) => {
    res.render("index.ejs");
})


app.post("/submit", (req, res) => {


    const filePath = 'data.json';

    // Read existing data
    let existingData = [];
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        if (fileContent) {
            existingData = JSON.parse(fileContent);
        }
    }

    // Append new data
    existingData.push(req.body);

    // Write updated data back to file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));



    console.log(req.body);
    res.render("submit.ejs", {
        name: req.body["student-name"],
    })

    
})

var adminAcc = {
    uid1: {
        username: "abel",
        password: "osbert"
    }
};

app.get("/admin", (req, res) => {
    res.render("login.ejs");
    app.post("/admin/login", (req, res) => {

        if (dbUsername === req.body["username"] && dbPassword === req.body["password"]) {
            res.sendStatus(200);
        } else {
            res.render("login.ejs", {authFail: true});
        }
    })
})