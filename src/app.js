import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import MODELMERGE from "./models/model-synchronize.js";
import FaskesModel from "./models/faskes-model.js";
import authorizationMiddleware from "./middlewares/authorization-middleware.js";
import sequelizeInstance from "./configurations/sequelize-instance.js";

const APPLICATION_PORT = process.env.APPLICATION_PORT;
const APPLICATION_HOST = process.env.APPLICATION_HOST;

const app = express();
app.use(cors({
    origin: '*',
    allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'User-Agent', 'Content-Length', 'Authorization'],
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));
app.use(express.json({ limit: "25 mb" }));
app.use(express.urlencoded({ extended: false, limit: "25 mb"  }));
app.use(authorizationMiddleware)
app.use(routes);
app.use(errorMiddleware);
app.listen(APPLICATION_PORT, APPLICATION_HOST, async () => {
    try {
        for (const model of MODELMERGE) {
            await model.sync({ alter: false, force: true });
        }
    } catch (error) {
        console.error("Failed to synchronize the database:", error);
    }


    await sequelizeInstance.transaction(async (tr) => {
        await FaskesModel.findOrCreate(
            {
                transaction: tr,
                where: {
                    uuid: "9d403ufjh43ufh3uf8430ihf"
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