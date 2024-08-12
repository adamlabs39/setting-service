import FaskesProfileService from "../services/faskes-profile-service.js";

export default class FaskesProfileController {
  static async findByUuid(request, response, nextFunction) {
    try {
      const result = await FaskesProfileService.findByUuid(request.params.uuid);
      response.status(200).json(result);
    } catch (error) {
      nextFunction(error);
    }
  }

  static async update(request, response, nextFunction) {
    try {
      request.body.uuid = request.params.uuid;
      const result = await FaskesProfileService.update(request.body);
      response.status(200).json(result);
    } catch (error) {
      nextFunction(error);
    }
  }
}
