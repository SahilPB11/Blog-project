import express from "express";
import articleRouter from "./routes/articles.js";
const app = express();

app.set('view engine', 'ejs');
app.set("/view", "view")

app.use("", articleRouter);

app.listen(5000, () => {
    console.log("Server is wrking on port no 5000");
})
