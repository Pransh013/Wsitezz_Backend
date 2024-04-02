import express from "express";
import userSignupController from "../controllers/user/userSignupController";
import userSigninController from "../controllers/user/userSigninController";

const router = express.Router();

router.post("/signup", userSignupController);
router.post("/signin", userSigninController);

export { router as userRouter };
