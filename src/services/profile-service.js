import ProfileRepository from "../repositories/profile-repository.js";
import NotfoundException from "../errors/notfound-exception.js";
import ZodValidator from "../validations/zod-validator.js";
import ProfileValidation from "../validations/profile-validation.js";
import BadRequestException from "../errors/bad-request-exception.js";
import bcrypt from "bcrypt";
import {toEpochDate} from "../helpers/date-helper.js";

export default class ProfileService {
    static async getProfileByUuid(uuid) {
        const profile = await ProfileRepository.getByUuid(uuid);
        if (!profile) {
            throw new NotfoundException("profile tidak ditemukan");
        }

        profile.role = {
            role_uuid: profile.role_uuid,
            name: profile.role_name
        }
        delete profile.role_uuid;
        delete profile.role_name;

        profile.inventory_medis = profile.iventory_medis
        profile.inventory_non_medis = profile.iventory_non_medis
        delete profile.iventory_medis;
        delete profile.iventory_non_medis;

        return profile;
    }

    static async update(req){
        let validData = ZodValidator.validate(ProfileValidation.UPDATE, req);
        validData.updatedAt = toEpochDate(new Date());

        if ((req.old_password && req.password) || (!req.old_password && !req.password )){
            const user = await ProfileRepository.getByUuid(validData.uuid);
            if (!user) {
                throw new NotfoundException("profile tidak ditemukan");
            }
            if(req.old_password && req.password){
                bcrypt.compare(req.old_password, user.password, (err, result) => {
                    if(err){
                        throw new BadRequestException("password lama tidak sesuai");
                    }
                });

                if(req.password === req.old_password){
                    throw new BadRequestException("password baru tidak boleh sama dengan password lama");
                }

                validData.password = await bcrypt.hash(req.password, 10);
            }
        } else {
            throw new BadRequestException("password lama dan password baru harus diisi semua");
        }

        const affectedRow = await ProfileRepository.update(validData);
        if(affectedRow === 0){
            throw new NotfoundException("gagal mengupdate profile, data tidak ditemukan");
        }
    }
}