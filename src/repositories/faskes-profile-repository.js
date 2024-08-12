import sequelizeInstance from "../configurations/sequelize-instance.js";
import FaskesProfilesModel from "../models/faskes-profiles-model.js";
import {Op} from "sequelize";
import AddressModel from "../models/address-model.js";
import NotfoundException from "../errors/notfound-exception.js";
import FaskesModel from "../models/faskes-model.js";
import {uuidv7} from "uuidv7";

export default class FaskesProfileRepository {
    static async getByFaskesUuid(uuid){
        return await sequelizeInstance.transaction(async tr => {
            let profile = await FaskesProfilesModel.findOne({
                where: {
                    faskesUuid: uuid
                },
                transaction: tr
            });

            if(profile === null) {
                const faskes = await FaskesModel.findOne({
                    where: {
                        uuid
                    },
                    transaction: tr
                });

                if(faskes === null){
                    throw new NotfoundException("Faskes not found");
                }

                 profile = await this.create({
                    uuid: uuidv7(),
                    faskesUuid: uuid,
                    code: faskes.dataValues.code,
                    name: faskes.dataValues.name,
                    addressUuid: uuidv7(),
                    phone: "",
                    email: "",
                    website: "",
                    urlGmaps: ""
                }, tr);
            }

            const address = await AddressModel.findOrCreate({
                where: {
                    uuid: profile.dataValues.addressUuid
                },
                transaction: tr,
                attributes: ['uuid', 'prov', 'city', 'district', 'village', 'postal_code'],
                defaults: {
                    faskesUuid: profile.dataValues.faskesUuid,
                }
            });

            return {
                ...profile.dataValues,
                address: address.dataValues
            };
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

            await AddressModel.update(req.address, {
                where: {
                    uuid: req.address.uuid
                },
                transaction: tr,
            });

            return affectedRow[0];
        });
    }


}