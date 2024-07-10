// Express
import express from "express";
// Middleware
import authenticationMiddleware from "../middleware/authentication";
import allowRouteUse from "../middleware/adminUse";
// Controllers
import createInstanceTemplate from "../controllers/instanceTemplates/createInstanceTemplate";
import deleteInstanceTemplate from "../controllers/instanceTemplates/deleteInstanceTemplate";
import getAllInstanceTemplates from "../controllers/instanceTemplates/getAllInstanceTemplates";
import getInstanceTemplateById from "../controllers/instanceTemplates/getInstanceTemplateById";
import updateInstanceTemplate from "../controllers/instanceTemplates/updateInstanceTemplate";

const router = express.Router();

router.get(
  "/instanceTemplates",
  allowRouteUse,
  authenticationMiddleware,
  getAllInstanceTemplates
);

router.get(
  "/:userId/instanceTemplates/:instanceTemplateId",
  allowRouteUse,
  authenticationMiddleware,
  getInstanceTemplateById
);

router.post(
  "/instanceTemplates/create",
  allowRouteUse,
  authenticationMiddleware,
  createInstanceTemplate
);

router.patch(
  "/instanceTemplates/update/:instanceTemplateId",
  allowRouteUse,
  authenticationMiddleware,
  updateInstanceTemplate
);

router.delete(
  "/instanceTemplates/delete/:instanceTemplateId",
  allowRouteUse,
  authenticationMiddleware,
  deleteInstanceTemplate
);

export default router;
