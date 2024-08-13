import express from "express";
import routes from "./routes/routes.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import {sequelizeInstance} from "./models/model-synchronize.js";
import FaskesModel from "./models/faskes-model.js";
import authorizationMiddleware from "./middlewares/authorization-middleware.js";
import UserModel from "./models/user-model.js";
import {Op} from "sequelize";
import bcrypt from "bcrypt";
import RoleModel from "./models/role-model.js";

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

        const role = await RoleModel.findOrCreate(
            {
                transaction: tr,
                where: {
                    name: "super admin"
                },
                defaults: {
                    faskesUuid: "0191019c-608b-773c-928b-eba6b915291",
                    code: "SPR-ADMN",
                    name: "super admin",
                    permisionUuid: "0191019c-608b-773c-928b-eba6b915291",
                    status: true,
                }
            }
        );

        const { uuid: roleUuid } = role[0].get();

        await UserModel.findOrCreate(
            {
                transaction: tr,
                where: {
                    [Op.and]: [
                        {
                            uuid: "019149f9-c4ea-770c-9516-fa09ad8eb29a"
                        }
                    ]
                },
                defaults: {
                    uuid: "019149f9-c4ea-770c-9516-fa09ad8eb29a",
                    faskesUuid: "9d403ufjh43ufh3uf8430ihf",
                    roleUuid: roleUuid,
                    dokterUuid: "coijr0i3nh0uc30hfjij3ci",
                    name: "alliano",
                    phone: "0811341082934",
                    email: "alliano@gmail.com",
                    username: "alliano-dev",
                    password: await bcrypt.hash("secreet_pass", 10),
                    inventoryMedis: true,
                    inventoryNonMedis: true,
                    status: true,
                    token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlVXVpZCI6IjAxOTE0OWY5LWM0ZTAtNzkzZS1hMGQwLTdlN2MwMmJlMWI0MSIsInVzZXJuYW1lIjoiYWxsaWFuby1kZXYiLCJmYXNrZXNVdWlkIjoiOWQ0MDN1ZmpoNDN1ZmgzdWY4NDMwaWhmIiwidXNlclV1aWQiOiIwMTkxNDlmOS1jNGVhLTc3MGMtOTUxNi1mYTA5YWQ4ZWIyOWEiLCJpYXQiOjE3MjM1MzM4MzMsImV4cCI6MTcyMzU0NDYzMywiaXNzIjoiYXV0aGVudGljYXRpb24tc2VyaXZpY2UifQ.taw3hZl82o-AQwTp4r42xEZxcl5VvN27KBTsRUhH9lEjTcCaK6QnvSYg3N5Vg197Nqn30aVFAplt4o81lLPQZXTYSZ-4Z0H0u-dcMucrmoaZhrkd6KBLT5ClCxCIyGlnoaNAU4lu0sPTQ7b7l9HXz2g3PDQfuXx7NvEB5Cx6sItyujlMC5qZyWnjNfGr6MqZChT5mHe-UjrbO1d11hY9vGAtbbs2SmisBQwSARvl7Q6FaDa-zwykyDa0YD2DA6qSFdqI1CtdxpZGnt0G-1Dh6So38cg6zx5KFFMLAiwwF5cYmdcWm1LGL6mWBjbjT53m5ZK2KmCwmfKOg3RNdrCRnQ"
                }
            }
        );
    })

    console.log(`Server running on http://${APPLICATION_HOST}:${APPLICATION_PORT}`);
});