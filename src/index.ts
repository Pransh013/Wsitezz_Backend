import express, { Request, Response } from "express";
import "dotenv/config";
import connectToDatabase from "./db";
import mainRouter from "./routes/main";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectToDatabase();
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
