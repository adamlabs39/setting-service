import sequelizeInstance from "../configurations/sequelize-instance.js";
import UserModel from "../models/user-model.js";

import {Op} from "sequelize";
import RoleModel from "../models/role-model.js";
import RoleRepository from "./role-repository.js";

export default class ProfileRepository {
    static async getByUuid(uuid) {
        return await sequelizeInstance.transaction(async (tr) => {
            const user = await UserModel.findOne({
                where: {
                    [Op.and]: [
                        {uuid: `${uuid}`},
                        {
                            deletedAt: {
                                [Op.is]: null
                            }
                        }
                    ]
                },
                attributes: ["uuid", "username", "name", "email", 'password' , "photo", "role_uuid", 'phone', 'inventory_medis', 'inventory_non_medis'],
                transaction: tr
            });

            const role = await RoleRepository.findByUuid(user.dataValues.role_uuid);

            return {
                ...user.dataValues,
                role_name: role.dataValues.name
            }
        });

    }

    static async update(user){
        return await sequelizeInstance.transaction(async (tr) => {
                const affectedRow = await UserModel.update(user, {
                    where: {uuid: user.uuid},
                    transaction: tr
                });
                return affectedRow[0];
        });
    }
}