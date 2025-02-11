import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

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