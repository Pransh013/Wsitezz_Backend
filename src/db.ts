import mongoose from "mongoose";

const connectToDatabase = () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/testDB"
  mongoose.connect(mongoUri);
  mongoose.connection.once("open", () => {
    console.log("Successfully connected to database");
  });

  mongoose.connection.on("error", (error) => {
    console.error("Database connection error:", error);
  });
};

export default connectToDatabase;
