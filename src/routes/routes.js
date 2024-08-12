import express from "express";
import FaskesProfileController from "../controllers/faskes-profile-controller.js";

const routes = express.Router();
// routes.use(authorizationMiddleware);

// HEALTH CHECK
routes.get("/health", (req, res) => res.status(200).json({ message: "OK" }));

// FASKES PROFILE
routes.get("/faskes-profile/:uuid", FaskesProfileController.findByUuid);
routes.put("/faskes-profile/:uuid", FaskesProfileController.update);

export default routes;