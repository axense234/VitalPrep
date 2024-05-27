import express from "express";

// Controllers and Middleware
import {
  createInstanceTemplate,
  deleteInstanceTemplate,
  getAllInstanceTemplates,
  getInstanceTemplateById,
  updateInstanceTemplate,
} from "../controllers/instanceTemplates";
import authenticationMiddleware from "../middleware/authentication";
import allowRouteUse from "../middleware/adminUse";

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
