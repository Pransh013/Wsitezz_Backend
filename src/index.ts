import express, { Request, Response } from "express";
import "dotenv/config";
import connectToDatabase from "./db";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectToDatabase();
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
