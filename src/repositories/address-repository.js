import sequelizeInstance from "../configurations/sequelize-instance.js";
import AddressModel from "../models/address-model.js";

export default class AddressRepository {
    static async getOrCreateBy(req) {
        return await sequelizeInstance.transaction(async tr => {
            return await AddressModel.findOrCreate({
                    where: {
                        uuid: req.uuid
                    },
                    transaction: tr,
                    attributes: ['uuid', 'prov', 'city', 'district', 'village', 'postal_code'],
                    defaults: {
                        faskesUuid: req.faskesUuid,
                    }
                },
            );
        })
    }
}