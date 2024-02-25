import express from "express";

// Controllers and Middlware
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/users";
import authenticationMiddleware from "../middleware/authentication";

const router = express.Router();

router.get("/users", authenticationMiddleware, getAllUsers);

router.get("/users/:userId", authenticationMiddleware, getUserById);

router.patch("/users/update/:userId", authenticationMiddleware, updateUserById);

router.delete(
  "/users/delete/:userId",
  authenticationMiddleware,
  deleteUserById
);

export default router;
