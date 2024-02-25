import express from "express";

// Controllers and Middleware
import {
  signupUser,
  loginUser,
  signoutUser,
} from "../controllers/authentication";

const router = express.Router();

router.post("/users/signup", signupUser);

router.post("/users/login", loginUser);

router.post("/users/signout", signoutUser);

export default router;
