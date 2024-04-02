import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: "string", unique: true, required: true },
  password: { type: "string", required: true },
  lastName: { type: "string", required: true },
  firstName: { type: "string", required: true },
});

const User = mongoose.model("User", userSchema);
export default User;
