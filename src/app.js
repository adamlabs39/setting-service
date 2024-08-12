import express from "express";
import routes from "./routes/routes.js";
import errorMiddleware from "./middlewares/error-middleware.js";
// import IntegrationModel from "./models/integration-model.js";
// import {sequelizeInstance} from "./models/model-synchronize.js";
// import FaskesProfilesModel from "./models/faskes-profiles-model.js";

const APPLICATION_PORT = process.env.APPLICATION_PORT;
const APPLICATION_HOST = process.env.APPLICATION_HOST;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(errorMiddleware);
app.listen(APPLICATION_PORT, APPLICATION_HOST, async () => {
    // await sequelizeInstance.sync({ alter: false, force: true})
    // await sequelizeInstance.transaction(async (tr) => {
    //     await FaskesProfilesModel.findOrCreate(
    //         {
    //             transaction: tr,
    //             where: {
    //                 uuid: "FP0001"
    //             },
    //             defaults: {
    //                 faskesUuid: "F0001",
    //                 code: "F0001",
    //                 name: "RSUD Dr. Soetomo",
    //                 addressUuid: "A0001",
    //                 phone: "031-5507123",
    //                 email: "soetomo@example.com",
    //                 website: "https://rsudsoetomo.com",
    //                 urlGmaps: "https://g.page/rsudsoetomo",
    //                 logo: "https://rsudsoetomo.com/logo.png",
    //                 bgWarna: "#000000",
    //                 status : true,
    //             }
    //         }
    //     )
    //
    //     await IntegrationModel.findOrCreate(
    //         {
    //             transaction: tr,
    //             where: {
    //                 uuid: "I0001"
    //             },
    //             defaults: {
    //                 faskesUuid: "F0001",
    //                 baseUrl: "https://sirs.yankes.kemkes.go.id",
    //                 userKey: "userkey lorem ipsum",
    //                 secretKey: "secretkey lorem ipsum",
    //                 consId: "consid lorem ipsum",
    //                 PPK: "ppk lorem ipsum",
    //                 apiKeyPost: "apikey lorem ipsum",
    //                 method: "POST",
    //                 endpoint: "/api/endpoint",
    //                 header: "header lorem ipsum",
    //                 request: "request lorem ipsum",
    //                 response: "response loremipsum",
    //                 status : true,
    //             }
    //         }
    //     )
    // })
    //
    console.log(`Server running on http://${APPLICATION_HOST}:${APPLICATION_PORT}`);
});