import express from "express";

const app = express();

app.set('view engine', 'ejs');
app.set("/view", "view")

app.get("/", (req, res) => {
    res.render('index');
})

app.listen(5000, () => {
    console.log("Server is wrking on port no 5000");
})
