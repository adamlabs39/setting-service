import FaskesModel from "../models/faskes-model.js";
import {Op} from "sequelize";
import sequelizeInstance from "../configurations/sequelize-instance.js";

export default class FaskesRepository {
    static async findByUuid(uuid) {
        return await sequelizeInstance.transaction(async (tr) => {
            return await FaskesModel.findOne({
                where: {
                    [Op.and]: [
                        {uuid},
                        {
                            deletedAt: {
                                [Op.is]: null,
                            },
                        },
                    ],
                },
                transaction: tr,
            });
        });
    }
}