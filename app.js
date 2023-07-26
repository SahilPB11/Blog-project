import express from "express";
import connectDB from "./connection/connectDb.js";
import articleRouter from "./routes/articles.js";
const app = express();

app.set("view engine", "ejs");
app.set("/view", "view");
connectDB();
app.use(express.json());
app.use("/articles", articleRouter);


app.listen(5000, () => {
  console.log("Server is wrking on port no 5000");
});
