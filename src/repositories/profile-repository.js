import sequelizeInstance from "../configurations/sequelize-instance.js";

import {Op} from "sequelize";
import RoleRepository from "./role-repository.js";
import NotfoundException from "../errors/notfound-exception.js";
import {UserModel} from "@adameds/model-sdk/datamaster";

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
                attributes: ["uuid", "username", "name", "email", 'password' , "photo", "role_uuid", 'phone', 'inventory_medis', 'inventory_non_medis', 'awal_gelar', 'akhir_gelar'],
                transaction: tr
            });

            if (!user) {
                throw new NotfoundException("User not found");
            }

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