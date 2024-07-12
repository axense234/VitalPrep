// Express
import express from "express";
// Middleware
import allowRouteUse from "../middleware/adminUse";
// Controllerss
import deleteUserById from "../controllers/users/deleteUserById";
import getAllUsers from "../controllers/users/getAllUsers";
import getUserById from "../controllers/users/getUserById";
import updateUserById from "../controllers/users/updateUserById";
import authenticationMiddleware from "../middleware/authentication";

const router = express.Router();

router.get("/users", allowRouteUse, getAllUsers);

router.get(
  "/users/:userId",
  allowRouteUse,
  authenticationMiddleware,
  getUserById
);

router.patch(
  "/users/update/:userId",
  allowRouteUse,
  authenticationMiddleware,
  updateUserById
);

router.delete(
  "/users/delete/:userId",
  allowRouteUse,
  authenticationMiddleware,
  deleteUserById
);

export default router;
