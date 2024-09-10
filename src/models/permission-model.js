import { DataTypes, Model } from "sequelize";
import sequelizeInstance from "../configurations/sequelize-instance.js";
import { uuidv7 } from "uuidv7";
import fieldTime from "./base-model.js";

export default class PermissionModel extends Model {}
PermissionModel.init(
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
            defaultValue: () => uuidv7(),
            unique: true,
        },
        faskesUuid: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        kategori: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        codeMainMenu: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        nameMainMenu: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        mainMenu: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        codeSubMenu: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true,
        },
        nameSubMenu: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        ...fieldTime,
    },
    {
        sequelize: sequelizeInstance,
        tableName: "permissions",
        underscored: true,
        timestamps: false,
    }
);
