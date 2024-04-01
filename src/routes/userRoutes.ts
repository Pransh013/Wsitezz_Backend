import express from "express";

const router = express.Router();

router.get("/getUsers", (req, res) => {
  res.json(["Hii"]);
});

export { router as userRouter };
