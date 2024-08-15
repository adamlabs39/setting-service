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
routes.get(`/${apiBase}/${apiVersion}/setting/health`, (req, res) => res.status(200).json({ message: "OK" }));

// FASKES PROFILE
routes.get(`/${apiBase}/${apiVersion}/setting/profil_faskes`, FaskesProfileController.findByFaskesUuid);
routes.put(`/${apiBase}/${apiVersion}/setting/profil_faskes`, FaskesProfileController.update);

// INTERGRATION
routes.get(`/${apiBase}/${apiVersion}/setting/integrasi`, IntegrationController.findByUuid);
routes.put(`/${apiBase}/${apiVersion}/setting/integrasi_vclaim`, IntegrationController.updateVclaim);
routes.put(`/${apiBase}/${apiVersion}/setting/integrasi_other`, IntegrationController.updateOther);

// PROFILE
routes.get(`/${apiBase}/${apiVersion}/setting/profile`, ProfileController.getProfile);
routes.put(`/${apiBase}/${apiVersion}/setting/profile`, ProfileController.updateProfile);

// PRINTER
routes.get(`/${apiBase}/${apiVersion}/setting/printer`, PrinterController.findByUuid);
routes.put(`/${apiBase}/${apiVersion}/setting/printer`, PrinterController.update);

export default routes;