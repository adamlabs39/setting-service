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

        return profile;
    }

    static async update(req){
        let validData = ZodValidator.validate(ProfileValidation.UPDATE, req);
        validData.updatedAt = toEpochDate(new Date());

        if ((req.old_pass && req.new_pass && req.validation_pass) || (!req.old_pass && !req.new_pass && !req.validation_pass)){
            const user = await ProfileRepository.getByUuid(validData.uuid);
            if (!user) {
                throw new NotfoundException("profile tidak ditemukan");
            }
            if(req.old_pass && req.new_pass && req.validation_pass){
                bcrypt.compare(req.old_pass, user.password, (err, result) => {
                    if(err){
                        throw new BadRequestException("password lama tidak sesuai");
                    }
                });

                if(req.new_pass === req.old_pass){
                    throw new BadRequestException("password baru tidak boleh sama dengan password lama");
                }

                if(req.new_pass !== req.validation_pass){
                    throw new BadRequestException("password validasi tidak sama");
                }
                validData.password = await bcrypt.hash(req.new_pass, 10);
            }
        } else {
            throw new BadRequestException("password lama, password baru, dan validasi password harus diisi semua");
        }

        const affectedRow = await ProfileRepository.update(validData);
        if(affectedRow === 0){
            throw new NotfoundException("gagal mengupdate profile, data tidak ditemukan");
        }
    }
}