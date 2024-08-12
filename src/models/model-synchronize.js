import sequelizeInstance from "../configurations/sequelize-instance.js";
import AddressModel from "./address-model.js";
import IntegrationModel from "./integration-model.js";
import PrinterModel from "./printer-model.js";
import OtoritationPasswordsModel from "./otoritation-passwords-model.js";
import PermissionModel from "./permission-model.js";
import AccountProfilesModel from "./account-profiles-model.js";
import FaskesProfilesModel from "./faskes-profiles-model.js";
import FaskesModel from "./faskes-model.js";

export {sequelizeInstance, AddressModel, PermissionModel, FaskesProfilesModel, AccountProfilesModel, OtoritationPasswordsModel, IntegrationModel, PrinterModel, FaskesModel};