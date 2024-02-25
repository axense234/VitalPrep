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
  "/instanceTemplates/:instanceTemplateId",
  authenticationMiddleware,
  getInstanceTemplateById
);

router.post(
  "/instanceTemplates/create",
  authenticationMiddleware,
  getInstanceTemplateById
);

router.patch(
  "/instanceTemplates/update/:instanceTemplateId",
  authenticationMiddleware,
  getInstanceTemplateById
);

router.delete(
  "/instanceTemplates/delete/:instanceTemplateId",
  authenticationMiddleware,
  getInstanceTemplateById
);

export default router;
