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

const router = express.Router();

router.get(
  "/instanceTemplates",
  authenticationMiddleware,
  getAllInstanceTemplates
);

router.get(
  "/:userId/instanceTemplates/:instanceTemplateId",
  authenticationMiddleware,
  getInstanceTemplateById
);

router.post(
  "/instanceTemplates/create",
  authenticationMiddleware,
  createInstanceTemplate
);

router.patch(
  "/instanceTemplates/update/:instanceTemplateId",
  authenticationMiddleware,
  updateInstanceTemplate
);

router.delete(
  "/instanceTemplates/delete/:instanceTemplateId",
  authenticationMiddleware,
  deleteInstanceTemplate
);

export default router;
