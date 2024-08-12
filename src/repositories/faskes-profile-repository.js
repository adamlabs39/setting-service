import sequelizeInstance from "../configurations/sequelize-instance.js";
import FaskesProfilesModel from "../models/faskes-profiles-model.js";
import {Op} from "sequelize";
import AddressModel from "../models/address-model.js";
import NotfoundException from "../errors/notfound-exception.js";

export default class FaskesProfileRepository {
    static async getByFaskesUuid(uuid){
        return await sequelizeInstance.transaction(async tr => {
            const profile = await FaskesProfilesModel.findOne({
                where: {
                    faskesUuid: uuid
                },
                transaction: tr
            });

            if(profile === null) throw new NotfoundException('faskes profile tidak ditemukan');

            const address = await AddressModel.findOne({
                where: {
                    uuid: profile.dataValues.addressUuid
                },
                transaction: tr,
                attributes: ['uuid', 'prov', 'city', 'district', 'village', 'postal_code']
            });

            return {
                ...profile.dataValues,
                address: address.dataValues
            };
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