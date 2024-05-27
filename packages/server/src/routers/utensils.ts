import express from "express";

// Controllers and Middleware
import {
  createUtensil,
  deleteUtensil,
  getAllUtensils,
  getUtensilById,
  updateUtensil,
} from "../controllers/utensils";
import authenticationMiddleware from "../middleware/authentication";
import allowRouteUse from "../middleware/adminUse";

const router = express.Router();

router.get(
  "/utensils",
  allowRouteUse,
  authenticationMiddleware,
  getAllUtensils
);

router.get(
  "/:userId/utensils/:utensilId",
  authenticationMiddleware,
  getUtensilById
);

router.post(
  "/utensils/create",
  allowRouteUse,
  authenticationMiddleware,
  createUtensil
);

router.patch(
  "/utensils/update/:utensilId",
  allowRouteUse,
  authenticationMiddleware,
  updateUtensil
);

router.delete(
  "/utensils/delete/:utensilId",
  allowRouteUse,
  authenticationMiddleware,
  deleteUtensil
);

export default router;
