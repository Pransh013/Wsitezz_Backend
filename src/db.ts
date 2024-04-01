import mongoose from "mongoose";

const connectToDatabase = () => {

  mongoose.connect(process.env.MONGO_URI!);
  mongoose.connection.once("open", () => {
    console.log("Successfully connected to database");
  });

  mongoose.connection.on("error", (error) => {
    console.error("Database connection error:", error);
  });
};

export default connectToDatabase;
