import { DataTypes, Model } from "sequelize";
import sequelizeInstance from "../configurations/sequelize-instance.js";
import { uuidv7 } from "uuidv7";
import fieldTime from "./base-model.js";

export default class IntegrationModel extends Model {}
IntegrationModel.init(
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
        baseUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        userKey: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        secretKey: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        consId: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        PPK: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        apiKeyPost: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        method: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        endpoint: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        header: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        request: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        response: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        ...fieldTime,
    },
    {
        sequelize: sequelizeInstance,
        tableName: "integrations",
        underscored: true,
        timestamps: false,
    }
);
