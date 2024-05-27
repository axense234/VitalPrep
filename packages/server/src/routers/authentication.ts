import express from "express";

// Controllers and Middleware
import {
  signupUser,
  loginUser,
  signoutUser,
} from "../controllers/authentication";
import allowRouteUse from "../middleware/adminUse";

const router = express.Router();

router.post("/users/signup", allowRouteUse, signupUser);

router.post("/users/login", allowRouteUse, loginUser);

router.post("/users/signout/:userId", allowRouteUse, signoutUser);

export default router;
