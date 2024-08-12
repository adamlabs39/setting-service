import sequelizeInstance from "../configurations/sequelize-instance.js";
import FaskesProfilesModel from "../models/faskes-profiles-model.js";
import {Op} from "sequelize";

export default class FaskesProfileRepository {
    static async getByUuid(uuid){
        return await sequelizeInstance.transaction(async tr => {
            return await FaskesProfilesModel.findOne({
                where: {
                    uuid
                },
                transaction: tr
            });
        });
    }

    static async update(req){
        return await sequelizeInstance.transaction(async tr => {
            const affectedRow = await FaskesProfilesModel.update(req, {
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