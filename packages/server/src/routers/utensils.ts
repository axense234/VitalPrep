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

const router = express.Router();

router.get("/utensils", authenticationMiddleware, getAllUtensils);

router.get("/utensils/:utensilId", authenticationMiddleware, getUtensilById);

router.post("/utensils/create", authenticationMiddleware, createUtensil);

router.patch(
  "/utensils/update/:utensilId",
  authenticationMiddleware,
  updateUtensil
);

router.delete(
  "/utensils/delete/:utensilId",
  authenticationMiddleware,
  deleteUtensil
);

export default router;
