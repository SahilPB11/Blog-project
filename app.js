import express, { urlencoded } from "express";
import connectDB from "./connection/connectDb.js";
import articleRouter from "./routes/articles.js";
const app = express();

// connection with mongo db
connectDB();

// set the view engine to access ejs files
app.set("view engine", "ejs");
app.set("/view", "view");

// using json and urlencoded to read data
app.use(express.json());
app.use(urlencoded({ extended: false }));

// here we are using the routes for comming requests
app.use("", articleRouter);

// here we are listen the server
app.listen(5000, () => {
  console.log("Server is wrking on port no 5000");
});
