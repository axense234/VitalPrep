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
import allowRouteUse from "../middleware/adminUse";

const router = express.Router();

router.get(
  "/dayTemplates",
  allowRouteUse,
  authenticationMiddleware,
  getAllDayTemplates
);

router.get(
  "/:userId/dayTemplates/:dayTemplateId",
  allowRouteUse,
  authenticationMiddleware,
  getDayTemplateById
);

router.post(
  "/dayTemplates/create",
  allowRouteUse,
  authenticationMiddleware,
  createDayTemplate
);

router.patch(
  "/dayTemplates/update/:dayTemplateId",
  allowRouteUse,
  authenticationMiddleware,
  updateDayTemplate
);

router.delete(
  "/dayTemplates/delete/:dayTemplateId",
  allowRouteUse,
  authenticationMiddleware,
  deleteDayTemplate
);

export default router;
