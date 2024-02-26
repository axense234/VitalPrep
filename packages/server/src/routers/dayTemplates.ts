import express from "express";

// Controllers and Middleware
import {
  createDayTemplate,
  deleteDayTemplate,
  getAllDayTemplates,
  getDayTemplateById,
  updateDayTemplate,
} from "../controllers/dayTemplates";
import authenticationMiddleware from "../middleware/authentication";

const router = express.Router();

router.get("/dayTemplates", authenticationMiddleware, getAllDayTemplates);

router.get(
  "/:userId/dayTemplates/:dayTemplateId",
  authenticationMiddleware,
  getDayTemplateById
);

router.post(
  "/dayTemplates/create",
  authenticationMiddleware,
  createDayTemplate
);

router.patch(
  "/dayTemplates/update/:dayTemplateId",
  authenticationMiddleware,
  updateDayTemplate
);

router.delete(
  "/dayTemplates/delete/:dayTemplateId",
  authenticationMiddleware,
  deleteDayTemplate
);

export default router;
