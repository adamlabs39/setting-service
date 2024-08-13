import express from "express";
import routes from "./routes/routes.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import {sequelizeInstance} from "./models/model-synchronize.js";
import FaskesModel from "./models/faskes-model.js";
import authorizationMiddleware from "./middlewares/authorization-middleware.js";
import UserModel from "./models/user-model.js";
import {Op} from "sequelize";
import bcrypt from "bcrypt";

const APPLICATION_PORT = process.env.APPLICATION_PORT;
const APPLICATION_HOST = process.env.APPLICATION_HOST;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authorizationMiddleware)
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

        await UserModel.findOrCreate(
            {
                transaction: tr,
                where: {
                    [Op.and]: [
                        {
                            email: "alliano@gmail.com",
                            username: "alliano-dev"
                        }
                    ]
                },
                defaults: {
                    faskesUuid: "9d403ufjh43ufh3uf8430ihf",
                    roleUuid: "ckamkdekodldmakdmaj",
                    dokterUuid: "coijr0i3nh0uc30hfjij3ci",
                    name: "alliano",
                    phone: "0811341082934",
                    email: "alliano@gmail.com",
                    username: "alliano-dev",
                    password: await bcrypt.hash("secreet_pass", 10),
                    iventoryMedis: true,
                    iventoryNonMedis: true,
                    status: true,
                    token : "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlVXVpZCI6IjAxOTE0OWMyLTM2NzYtNzNiNi1hZTkxLTdiMDFiMjM2ZjI1ZSIsInVzZXJuYW1lIjoiYWxsaWFuby1kZXYiLCJmYXNrZXNVdWlkIjoiOWQ0MDN1ZmpoNDN1ZmgzdWY4NDMwaWhmIiwiaWF0IjoxNzIzNTE5NDk5LCJleHAiOjE3MjM1MzAyOTksImlzcyI6ImF1dGhlbnRpY2F0aW9uLXNlcml2aWNlIn0.v1rHXkr98Krk0dO7MajqxaHqs5lU9vuCwXZ96hozl6kwPOqS8hL8Ns7JY_rUiQyO3LOHzyOBN2Ed1TNfzHGVcrsX5P-m0DVmGFQMMbOM_QKIOKUPs2xv5mSHjCL2uP7GpTurob8vvsU3cikZyelG0PCKM565v7hWuVIZNQp3yOm6MuraotDhkb9B9KPY9RKLQCXOOkMApW9I5Ncss6Hr54m5XS_22y24UtJptQrGcPZxi6xKTHybIA9b-b492DgJBOPr7AUcxucYZKlD6zs4HAlrQ7cCB6-O4fNeUMRPXx8s34QeMZDoKN8-89y-k_lcrTGvNSRYvrcsoMjMr6djTw"
                }
            }
        );
    })

    console.log(`Server running on http://${APPLICATION_HOST}:${APPLICATION_PORT}`);
});