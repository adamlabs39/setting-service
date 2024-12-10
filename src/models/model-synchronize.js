import sequelizeInstance from "../configurations/sequelize-instance.js";
import {
    AddressModel,
    FaskesProfilesModel,
    IntegrationModel,
    OtoritationPasswordsModel, PpnModel, PrinterModel
} from "@adameds/model-sdk/setting";
import {PegawaiModel, RoleModel, UserModel} from "@adameds/model-sdk/datamaster";

const MODELMERGE = [
    // AddressModel,
    // FaskesProfilesModel,
    // OtoritationPasswordsModel,
    // IntegrationModel,
    // PrinterModel,
    // PpnModel,
    UserModel,
    PegawaiModel,
    // RoleModel
];

export default MODELMERGE;