// Express
import express from "express";
// Middleware
import authenticationMiddleware from "../middleware/authentication";
import allowRouteUse from "../middleware/adminUse";
// Controllers
import createDayTemplate from "../controllers/dayTemplates/createDayTemplate";
import deleteDayTemplate from "../controllers/dayTemplates/deleteDayTemplate";
import getAllDayTemplates from "../controllers/dayTemplates/getAllDayTemplates";
import getDayTemplateById from "../controllers/dayTemplates/getDayTemplateById";
import updateDayTemplate from "../controllers/dayTemplates/updateDayTemplate";

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
