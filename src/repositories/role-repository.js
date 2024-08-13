import sequelizeInstance from "../configurations/sequelize-instance.js";
import RoleModel from "../models/role-model.js";

export default class RoleRepository {
    static async findByUuid(uuid) {
        return await sequelizeInstance.transaction(async (tr) => {
            try {
                return await RoleModel.findOne({
                    where: {
                        uuid,
                        deletedAt: null
                    },
                    transaction: tr
                });
            } catch (error) {
                throw error;
            }
        });
    }
}