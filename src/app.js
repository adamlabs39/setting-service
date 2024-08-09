import express from "express";
import routes from "./routes/routes.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import UserModel from "./models/user-model.js";


const app = express();
app.use(express.json());
app.use(routes);
app.use(errorMiddleware);
app.listen("8080", "localhost", async () => {
    await UserModel.sync({ alter: false, force: true})
    console.log(`Server running on http://localhost:8080`)
});