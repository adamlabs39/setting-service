import sequelizeInstance from "../configurations/sequelize-instance.js";
import AddressModel from "./address-model.js";
import IntegrasiModel from "./integrasi-model.js";
import PrinterModel from "./printer-model.js";
import PasswordOtorisasiModel from "./password-otorisasi-model.js";
import PermissionModel from "./permission-model.js";
import ProfileAkunModel from "./profile-akun-model.js";
import ProfileFaskesModel from "./profile-faskes-model.js";

export {sequelizeInstance, AddressModel, PermissionModel, ProfileFaskesModel, ProfileAkunModel, PasswordOtorisasiModel, IntegrasiModel, PrinterModel};