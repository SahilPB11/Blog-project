import mongoose from "mongoose";

const connectDB = async() => {
    try{
        await mongoose
        .connect('mongodb://127.0.0.1:27017/',{
            dbName: "Blog",
            useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then((c) => console.log(`Databse connected safely with ${c.connection.name}`))
    }catch{(error)
        console.log(error);
    }
}
export default connectDB;



