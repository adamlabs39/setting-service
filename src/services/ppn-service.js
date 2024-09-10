import FaskesRepository from "../repositories/faskes-repository.js";
import NotfoundException from "../errors/notfound-exception.js";
import PrinterRepository from "../repositories/printer-repository.js";
import ZodValidator from "../validations/zod-validator.js";
import PrinterValidation from "../validations/printer-validation.js";
import {toEpochDate} from "../helpers/date-helper.js";
import Utils from "../helpers/utils.js";
import PpnRepository from "../repositories/ppn-repository.js";
import PpnValidation from "../validations/ppn-validation.js";

export default class PpnService {
    static async findByUuid(uuid) {
        const faskes = await FaskesRepository.findByUuid(uuid);
        if(faskes === null) throw new NotfoundException('faskes tidak ditemukan');

        let data = await PpnRepository.findByFaskesUuid(uuid);

        if(data === null) {
            data = await PpnRepository.create({faskesUuid : uuid})
        }

        return Utils.camelToSnakeObject(data.dataValues);
    }

    static async update(req) {
        const validData = ZodValidator.validate(PpnValidation.UPDATE, req);
        validData.updatedAt = toEpochDate(new Date());
        const affectedRow = await PpnRepository.update(validData);
        if(affectedRow === 0) throw new NotfoundException('gagal mengupdate ppn, data tidak ditemukan');
        return { message: `berhasil mengupdate ${affectedRow} ppn` };
    }
}