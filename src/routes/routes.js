import express from "express";
import FaskesProfileController from "../controllers/faskes-profile-controller.js";
import IntegrationController from "../controllers/integration-controller.js";
import ProfileController from "../controllers/profile-controller.js";
import PrinterController from "../controllers/printer-controller.js";

const apiBase = process.env.API_BASE || "api";
const apiVersion = process.env.API_VERSION || "v1";

const routes = express.Router();
// routes.use(authorizationMiddleware);

// HEALTH CHECK
routes.get(`/${apiBase}/${apiVersion}/health`, (req, res) => res.status(200).json({ message: "OK" }));

// FASKES PROFILE
routes.get(`/${apiBase}/${apiVersion}/faskes-profile`, FaskesProfileController.findByFaskesUuid);
routes.put(`/${apiBase}/${apiVersion}/faskes-profile`, FaskesProfileController.update);

// INTERGRATION
routes.get(`/${apiBase}/${apiVersion}/integration`, IntegrationController.findByUuid);
routes.put(`/${apiBase}/${apiVersion}/integration/vclaim`, IntegrationController.updateVclaim);
routes.put(`/${apiBase}/${apiVersion}/integration/other`, IntegrationController.updateOther);

// PROFILE
routes.get(`/${apiBase}/${apiVersion}/profile`, ProfileController.getProfile);
routes.put(`/${apiBase}/${apiVersion}/profile`, ProfileController.updateProfile);

// PRINTER
routes.get(`/${apiBase}/${apiVersion}/printer`, PrinterController.findByUuid);
routes.put(`/${apiBase}/${apiVersion}/printer`, PrinterController.update);

export default routes;