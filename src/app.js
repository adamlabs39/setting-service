import express from "express";
import routes from "./routes/routes.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import {sequelizeInstance} from "./models/model-synchronize.js";
import FaskesModel from "./models/faskes-model.js";

const APPLICATION_PORT = process.env.APPLICATION_PORT;
const APPLICATION_HOST = process.env.APPLICATION_HOST;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(errorMiddleware);
app.listen(APPLICATION_PORT, APPLICATION_HOST, async () => {
    await sequelizeInstance.sync({ alter: false, force: true})
    await sequelizeInstance.transaction(async (tr) => {
        await FaskesModel.findOrCreate(
            {
                transaction: tr,
                where: {
                    uuid: "F0001"
                },
                defaults: {
                    code: "F0001",
                    name: "RSUD Dr. Soetomo",
                    status: true,
                }
            }
        );
    })

    console.log(`Server running on http://${APPLICATION_HOST}:${APPLICATION_PORT}`);
});