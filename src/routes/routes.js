import express from "express";
import HomeController from "../controllers/home-controller.js";
import ProductController from "../controllers/product-controller.js";

const routes = express.Router();
routes.get("/home", HomeController.home);
routes.get("/health", (req, res) => res.status(200).json({ message: "OK" }));
routes.get("/product/:uuid", ProductController.findByUuid);

export default routes;