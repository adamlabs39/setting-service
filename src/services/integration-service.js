import IntegrationRepository from "../repositories/integration-repository.js";
import NotfoundException from "../errors/notfound-exception.js";
import ZodValidator from "../validations/zod-validator.js";
import {toEpochDate} from "../helpers/date-helper.js";
import IntegrationValidation from "../validations/integration-validation.js";

export default class IntegrationService {
    static async findByUuid(uuid) {
        const data = await IntegrationRepository.findByUuid(uuid);
        if(data === null) throw new NotfoundException('data tidak ditemukan');
        return data;
    }

    static async updateVclaim(req) {
        const validData = ZodValidator.validate(IntegrationValidation.UPDATEVCLAIM, req);
        validData.updatedAt = toEpochDate(new Date());
        const affectedRow = await IntegrationRepository.update(validData);
        if(affectedRow === 0) throw new NotfoundException('gagal mengupdate integrasi, data tidak ditemukan');
        return { message: `berhasil mengupdate ${affectedRow} integrasi` };
    }

    static async updateOther(req) {
        const validData = ZodValidator.validate(IntegrationValidation.UPDATEOTHER, req);
        validData.updatedAt = toEpochDate(new Date());
        const affectedRow = await IntegrationRepository.update(validData);
        if(affectedRow === 0) throw new NotfoundException('gagal mengupdate integrasi, data tidak ditemukan');
        return { message: `berhasil mengupdate ${affectedRow} integrasi` };
    }
}