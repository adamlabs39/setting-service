import { DataTypes, Model } from "sequelize";
import sequelizeInstance from "../configurations/sequelize-instance.js";
import { uuidv7 } from "uuidv7";
import fieldTime from "./base-model.js";

export default class AccountProfilesModel extends Model {}
AccountProfilesModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true,
        },
        uuid: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false,
            defaultValue: uuidv7(),
            unique: true,
        },
        faskesUuid: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        photo: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        passLama: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        passBaru: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        confirmPass: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        ...fieldTime,
    },
    {
        sequelize: sequelizeInstance,
        tableName: "account_profiles",
        underscored: true,
        timestamps: false,
    }
);
