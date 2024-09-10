import SuccessResponse from "../responses/success-response.js";
import PpnService from "../services/ppn-service.js";

export default class PpnController {
    static async findByUuid(request, response, nextFunction) {
        try {
            const result = await PpnService.findByUuid(response.locals.jwtData.faskesUuid);
            response.status(200).json(SuccessResponse("data berhasil didapat", result));
        } catch (error) {
            nextFunction(error);
        }
    }

    static async update(request, response, nextFunction) {
        try {
            request.body.uuid = response.locals.jwtData.faskesUuid;
            const result = await PpnService.update(request.body);
            response.status(200).json(result);
        } catch (error) {
            nextFunction(error);
        }
    }
}