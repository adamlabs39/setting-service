import IntegrationModel from "../models/integration-model.js";
import {sequelizeInstance} from "../models/model-synchronize.js";
import {Op} from "sequelize";

export default class IntegrationRepository {
    static async findByUuid(uuid) {
        return await sequelizeInstance.transaction(async (tr) => {
            return await IntegrationModel.findOne({
                where: {
                    uuid
                },
                transaction: tr
            });
        });
    }

    static async update(req) {
        return await sequelizeInstance.transaction(async (tr) => {
            const affectedRow = await IntegrationModel.update(req, {
                where: {
                    [Op.and]: [
                        {uuid: req.uuid},
                        {
                            deletedAt: {
                                [Op.is]: null
                            }
                        }
                    ],
                },
                transaction: tr
            });

            return affectedRow[0];
        });
    }
}