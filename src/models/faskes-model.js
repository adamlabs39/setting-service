import {DataTypes, Model} from "sequelize";
import {uuidv7} from "uuidv7";
import fieldTime from "./base-model.js";
import sequelizeInstance from "../configurations/sequelize-instance.js";

export default class FaskesModel extends Model {}
FaskesModel.init(
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
        code: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        ...fieldTime,
    },
    {
        sequelize: sequelizeInstance,
        tableName: "faskeses",
        underscored: true,
        timestamps: false,
    }
);