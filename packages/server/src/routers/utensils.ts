// Express
import express from "express";
// Middleware
import authenticationMiddleware from "../middleware/authentication";
import allowRouteUse from "../middleware/adminUse";
// Controllers
import createUtensil from "../controllers/utensils/createUtensil";
import deleteUtensil from "../controllers/utensils/deleteUtensil";
import getAllUtensils from "../controllers/utensils/getAllUtensils";
import getUtensilById from "../controllers/utensils/getUtensilById";
import updateUtensil from "../controllers/utensils/updateUtensil";

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
