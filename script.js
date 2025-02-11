import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`currently listening to the port ${port}`);
})

app.get("/", (req, res) => {
    res.render("index.ejs");
})