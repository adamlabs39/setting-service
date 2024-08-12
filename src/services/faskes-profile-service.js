import ZodValidator from "../validations/zod-validator.js";
import FaskesProfileValidation from "../validations/faskes-profile-validation.js";
import FaskesProfileRepository from "../repositories/faskes-profile-repository.js";
import NotfoundException from "../errors/notfound-exception.js";
import {toEpochDate} from "../helpers/date-helper.js";
import FaskesRepository from "../repositories/faskes-repository.js";
import {uuidv7} from "uuidv7";
import AddressRepository from "../repositories/address-repository.js";

export default class FaskesProfileService {
    static async findByFaskesUuid(uuid) {
        const faskes = await FaskesRepository.findByUuid(uuid);
        if (faskes === null) throw new NotfoundException('faskes tidak ditemukan');


        let profile = await FaskesProfileRepository.getByFaskesUuid(uuid);
        if (profile === null) {
            profile = await FaskesProfileRepository.create({
                faskesUuid: uuid,
                code: faskes.dataValues.code,
                name: faskes.dataValues.name,
                addressUuid: uuidv7(),
                phone: "",
                email: "",
                website: "",
                urlGmaps: ""
            });
        }

        const address = await AddressRepository.getOrCreateBy({uuid: profile.dataValues.addressUuid, faskesUuid: uuid});

        return {
            ...profile.dataValues,
            address: {
                uuid: address[0].dataValues.uuid,
                prov: address[0].dataValues.prov,
                city: address[0].dataValues.city,
                district: address[0].dataValues.district,
                village: address[0].dataValues.village,
                postal_code: address[0].dataValues.postal_code
            }
        };
    }

    static async update(req) {
        const validData = ZodValidator.validate(FaskesProfileValidation.UPDATE, req);
        validData.updatedAt = toEpochDate(new Date());
        validData.address = {
            uuid: validData.addressUuid,
            prov: validData.prov,
            city: validData.city,
            district: validData.district,
            village: validData.village,
            postal_code: validData.postal_code
        };
        const affectedRow = await FaskesProfileRepository.update(validData);
        if (affectedRow === 0) throw new NotfoundException('gagal mengupdate faskes profile, data tidak ditemukan');
        return {message: `berhasil mengupdate ${affectedRow} faskes profile`};
    }
}