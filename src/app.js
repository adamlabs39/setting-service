import express from "express";
import routes from "./routes/routes.js";
import errorMiddleware from "./middlewares/error-middleware.js";
// import {sequelizeInstance} from "./models/model-synchronize.js";

const APPLICATION_PORT = process.env.APPLICATION_PORT;
const APPLICATION_HOST = process.env.APPLICATION_HOST;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(errorMiddleware);
app.listen(APPLICATION_PORT, APPLICATION_HOST, async () => {
    // await sequelizeInstance.sync({ alter: false, force: true})
    console.log(`Server running on http://localhost:8080`)
});