import ProfileService from "../services/profile-service.js";
import successResponse from "../responses/success-response.js";

export default class ProfileController {
    static async getProfile(request, response, nextFunction) {
        try {
            const userUuid = response.locals.jwtData.userUuid;
            console.log("user ", userUuid);
            const profile = await ProfileService.getProfileByUuid(userUuid);
            response.status(200).json(successResponse("data berhasil didapat", profile));
        } catch (error) {
            nextFunction(error);
        }
    }

    static async updateProfile(request, response, nextFunction) {
        try {
            const userUuid = response.locals.jwtData.userUuid;
            const req = request.body;
            req.uuid = userUuid;
            await ProfileService.update(req);
            response.status(200).json(successResponse("data berhasil diupdate"));
        } catch (error) {
            nextFunction(error);
        }
    }
}