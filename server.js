import { app } from "./app.js";
import connectDB from "./connection/connectDb.js";

// connection with mongo db
connectDB();

// here we are listen the server
app.listen(5000, () => {
  console.log("Server is wrking on port no 5000");
});
