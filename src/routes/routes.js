import express from "express";
import FaskesProfileController from "../controllers/faskes-profile-controller.js";
import IntegrationController from "../controllers/integration-controller.js";
import ProfileController from "../controllers/profile-controller.js";
import PrinterController from "../controllers/printer-controller.js";

const routes = express.Router();
// routes.use(authorizationMiddleware);

// HEALTH CHECK
routes.get("/health", (req, res) => res.status(200).json({ message: "OK" }));

// FASKES PROFILE
routes.get("/faskes-profile", FaskesProfileController.findByFaskesUuid);
routes.put("/faskes-profile", FaskesProfileController.update);

// INTERGRATION
routes.get("/integration", IntegrationController.findByUuid);
routes.put("/integration/vclaim/:uuid", IntegrationController.updateVclaim);
routes.put("/integration/other/:uuid", IntegrationController.updateOther);

// PROFILE
routes.get("/profile", ProfileController.getProfile);
routes.put("/profile", ProfileController.updateProfile);

// PRINTER
routes.get("/printer", PrinterController.findByUuid);
routes.put("/printer", PrinterController.update);

export default routes;