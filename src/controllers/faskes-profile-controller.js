import FaskesProfileService from "../services/faskes-profile-service.js";

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
}
