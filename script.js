import express from "express";
import dotenv from 'dotenv';
dotenv.config({path: './process.env'});
import bodyParser from "body-parser";
import fs from "fs";
import bcrypt from "bcrypt";

const saltRounds = 10;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', './views');

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

// Hash the username and password
bcrypt.hash(dbUsername, saltRounds, (err, hashedUsername) => {
    if (err) throw err;
    bcrypt.hash(dbPassword, saltRounds, (err, hashedPassword) => {
        if (err) throw err;

        app.get("/admin", (req, res) => {
            res.render("login.ejs");
            app.post("/admin/login", (req, res) => {
                console.log(req.body["password"] + " " + hashedPassword);
                bcrypt.compare(req.body["username"], hashedUsername, (err, usernameMatch) => {
                    if (err) throw err;
                    bcrypt.compare(req.body["password"], hashedPassword, (err, passwordMatch) => {
                        if (err) throw err;
                        if (usernameMatch && passwordMatch) {
                            compareStudents();
                            const filePathstu = "compatibility_scores.json";
                            res.download(filePathstu, 'compatibility_scores.json', (err) => {
                                if (err) {
                                    console.log("Error downloading the file:", err);
                                    return res.render("result.ejs", { downloadError: true });
                                } else {
                                    console.log("File downloaded successfully!");
                                    return res.render("result.ejs", { downloadError: false });
                                }
                            });
                        } else {
                            return res.render("login.ejs", {authFail: true});
                        }
                    });
                });
            })
        })
    });
});

function compareStudents() {
    const filePath = 'data.json';
    if (!fs.existsSync(filePath)) {
        console.log("No data found.");
        return;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const students = JSON.parse(fileContent);

    // Placeholder weights for each question
    const weights = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    let totalWeights = 0;
    for (let i = 0; i < weights.length; i++) {
        totalWeights += weights[i];
    }

    const maxIncompatibilityScore = 4 * 17 + totalWeights; // Maximum possible incompatibility score
    const compatibilityScores = [];

    for (let i = 0; i < students.length; i++) {
        for (let j = i + 1; j < students.length; j++) {
            const student1 = students[i];
            const student2 = students[j];
            let incompatibilityScore = 0;

            for (let k = 1; k <= 17; k++) {
                const questionKey = `q${k}`;
                const response1 = parseInt(student1[questionKey], 10);
                const response2 = parseInt(student2[questionKey], 10);
                const weight = weights[k - 1];
                incompatibilityScore += weight * Math.abs(response1 - response2);
            }

            const compatibilityScore = maxIncompatibilityScore - incompatibilityScore;
            compatibilityScores.push({
                student1: student1["student-name"],
                student2: student2["student-name"],
                score: compatibilityScore
            });
        }
    }

    // Sort the compatibility scores in descending order
    compatibilityScores.sort((a, b) => b.score - a.score);

    // Display the highest scores
    console.log("Top compatibility scores:");
    compatibilityScores.forEach(pair => {
        console.log(`Compatibility between ${pair.student1} and ${pair.student2}: ${pair.score}`);
    });

    // Write the highest scores to a JSON file
    const outputFilePath = 'compatibility_scores.json';
    fs.writeFileSync(outputFilePath, JSON.stringify(compatibilityScores, null, 2));
}

