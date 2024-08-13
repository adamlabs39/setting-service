import IntegrationModel from "../models/integration-model.js";
import {sequelizeInstance} from "../models/model-synchronize.js";
import {Op} from "sequelize";

export default class IntegrationRepository {
    static async findByFaskesUuid(uuid) {
        return await sequelizeInstance.transaction(async (tr) => {
            return await IntegrationModel.findOne({
                where: {
                    [Op.and]: [
                        {faskesUuid: uuid},
                        {
                            deletedAt: {
                                [Op.is]: null
                            }
                        }
                    ]
                },
                transaction: tr
            });
        });
    }

    static create(req) {
        return IntegrationModel.create(req);
    }

    static async update(req) {
        return await sequelizeInstance.transaction(async (tr) => {
            const affectedRow = await IntegrationModel.update(req, {
                where: {
                    [Op.and]: [
                        {faskes_uuid: req.uuid},
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