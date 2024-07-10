// Express
import express from "express";
// Middleware
import allowRouteUse from "../middleware/adminUse";
// Controllers
import signupUser from "../controllers/authentication/signupUser";
import loginUser from "../controllers/authentication/loginUser";
import signoutUser from "../controllers/authentication/signoutUser";

const router = express.Router();

router.post("/users/signup", allowRouteUse, signupUser);

router.post("/users/login", allowRouteUse, loginUser);

router.post("/users/signout/:userId", allowRouteUse, signoutUser);

export default router;
