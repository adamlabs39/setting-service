import ZodValidator from "../validations/zod-validator.js";
import FaskesProfileValidation from "../validations/faskes-profile-validation.js";
import FaskesProfileRepository from "../repositories/faskes-profile-repository.js";
import NotfoundException from "../exception/notfound-exception.js";
import {toEpochDate} from "../helpers/date-helper.js";

export default class FaskesProfileService {
    static async findByUuid(uuid) {
        const profile = await FaskesProfileRepository.getByUuid(uuid);
        if(profile === null) throw new NotfoundException('faskes profile tidak ditemukan');
        return profile;
    }

    static async update(req) {
        const validData = ZodValidator.validate(FaskesProfileValidation.UPDATE, req);
        validData.updatedAt = toEpochDate(new Date());
        const affectedRow = await FaskesProfileRepository.update(validData);
        if(affectedRow === 0) throw new NotfoundException('gagal mengupdate faskes profile, data tidak ditemukan');
        return { message: `berhasil mengupdate ${affectedRow} faskes profile` };
    }
}