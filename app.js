import express, { urlencoded } from "express";
import articleRouter from "./routes/articles.js";
import methodOverride from 'method-override';
import {marked} from 'marked';
import {mangle} from 'marked-mangle';
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

// running the server 
export const app = express();

// set the view engine to access ejs files
app.set("view engine", "ejs");
app.set("/view", "view");

// using json and urlencoded to read data
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(methodOverride('_method'));
marked.use(mangle());



// here we are using the routes for comming requests
app.use("", articleRouter);


// error handler
app.use(errorMiddleware);


