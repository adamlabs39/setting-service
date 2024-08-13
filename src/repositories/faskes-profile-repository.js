import sequelizeInstance from "../configurations/sequelize-instance.js";
import FaskesProfilesModel from "../models/faskes-profiles-model.js";
import {Op} from "sequelize";
import AddressModel from "../models/address-model.js";
import NotfoundException from "../errors/notfound-exception.js";

export default class FaskesProfileRepository {
    static async getByFaskesUuid(uuid){
        return await sequelizeInstance.transaction(async tr => {
            return await FaskesProfilesModel.findOne({
                where: {
                    faskesUuid: uuid
                },
                transaction: tr
            });
        });
    }

    static async create(req){
        return await sequelizeInstance.transaction(async tr => {
            return await FaskesProfilesModel.create(req, {
                transaction: tr
            });
        });
    }

    static async update(req){
        return await sequelizeInstance.transaction(async tr => {
            let affectedRow = await FaskesProfilesModel.update(req, {
                where: {
                    [Op.and]: [
                        {faskesUuid: req.uuid},
                        {
                            deletedAt: {
                                [Op.is]: null
                            }
                        }
                        ],
                },
                transaction: tr
            });

            if (affectedRow[0] === 0) throw new NotfoundException('gagal mengupdate faskes profile, data tidak ditemukan');

            affectedRow = await AddressModel.update(req.address, {
                where: {
                    uuid: req.address.uuid
                },
                transaction: tr,
            });

            if (affectedRow[0] === 0) throw new NotfoundException('gagal mengupdate faskes profile, data address tidak ditemukan');

            return affectedRow[0];
        });
    }


}