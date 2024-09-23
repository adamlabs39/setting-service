import FaskesProfileService from "../services/faskes-profile-service.js";
import SuccessResponse from "../responses/success-response.js";

export default class FaskesProfileController {
  static async findByFaskesUuid(request, response, nextFunction) {
    try {
      const result = await FaskesProfileService.findByFaskesUuid(response.locals.jwtData.faskesUuid);
      response.status(200).json(result);
    } catch (error) {
      nextFunction(error);
    }
  }

  static async update(request, response, nextFunction) {
    try {
      request.body.uuid = response.locals.jwtData.faskesUuid;
      const result = await FaskesProfileService.update(request.body);
      response.status(200).json(result);
    } catch (error) {
      nextFunction(error);
    }
  }

  static async updatePPN(request, response, nextFunction) {
    try {
      request.body.uuid = response.locals.jwtData.faskesUuid;
      const result = await FaskesProfileService.updatePPN(request.body);
      response.status(200).json(result);
    } catch (error) {
      nextFunction(error);
    }
  }

  static async updateBiayaAdministrasi(request, response, nextFunction) {
    try {
      request.body.uuid = response.locals.jwtData.faskesUuid;
      const result = await FaskesProfileService.updateBiayaAdministrasi(request.body);
      response.status(200).json(result);
    } catch (error) {
      nextFunction(error);
    }
  }

  static async findPPN(request, response, nextFunction) {
    try {
      const result = await FaskesProfileService.findPPN(response.locals.jwtData.faskesUuid);
      response.status(200).json(SuccessResponse("data berhasil didapat", result));
    } catch (error) {
      nextFunction(error);
    }
  }

  static async findBiayaAdministrasi(request, response, nextFunction) {
    try {
      const result = await FaskesProfileService.findBiayaAdministrasi(response.locals.jwtData.faskesUuid);
      response.status(200).json(SuccessResponse("data berhasil didapat", result));
    } catch (error) {
      nextFunction(error);
    }
  }
}
