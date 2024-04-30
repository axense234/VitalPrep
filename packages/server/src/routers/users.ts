import express from "express";

// Controllers and Middlware
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/users";
// Middleware
import authenticationMiddleware from "../middleware/authentication";
import allowRouteUse from "../middleware/adminUse";

const router = express.Router();

router.get("/users", allowRouteUse, getAllUsers);

router.get("/users/:userId", authenticationMiddleware, getUserById);

router.patch("/users/update/:userId", authenticationMiddleware, updateUserById);

router.delete("/users/delete/:userId", deleteUserById);

export default router;
