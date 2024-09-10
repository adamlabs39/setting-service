import sequelizeInstance from "../configurations/sequelize-instance.js";
import PrinterModel from "../models/printer-model.js";
import {Op} from "sequelize";
import PpnModel from "../models/ppn-model.js";

export default class PpnRepository {
    static async findByFaskesUuid(uuid) {
        return await sequelizeInstance.transaction(async (tr) => {
            return await PpnModel.findOne({
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

    static async create(req) {
        return await sequelizeInstance.transaction(async (tr) => {
            return await PpnModel.create(req, {
                transaction: tr
            });
        });
    }

    static async update(req) {
        return await sequelizeInstance.transaction(async (tr) => {
            let affectedRow = await PpnModel.update(req, {
                where: {
                    [Op.and]: [
                        {faskes_uuid: req.uuid},
                        {
                            deletedAt: {
                                [Op.is]: null
                            }
                        }
                    ]
                },
                transaction: tr
            });

            return affectedRow[0];
        });
    }
}