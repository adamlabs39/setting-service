import {z} from 'zod';
import {
    addressUuidRequired,
    codeRequired, emailRequired,
    nameRequired, phoneRequired, urlGmapsRequired,
    uuidRequired, websiteRequired
} from "./message-validation-error.js";

export default class FaskesProfileValidation {
    static UPDATE = z.object({
        uuid: z.string().min(1, uuidRequired),
        code: z.string().min(1, codeRequired),
        name: z.string().min(1, nameRequired),
        addressUuid: z.string().min(1, addressUuidRequired),
        phone: z.string().min(1, phoneRequired),
        email: z.string().email().min(1, emailRequired),
        website: z.string().min(1, websiteRequired),
        urlGmaps: z.string().min(1, urlGmapsRequired),
        prov : z.string(),
        city: z.string(),
        district : z.string(),
        village: z.string(),
        postalCode: z.string(),
        fullAddress: z.string(),
        logo: z.string(),
        bgWarna: z.string(),
    });

    static UPDATE_PPN = z.object({
        uuid: z.string().min(1, uuidRequired),
        statusPpn: z.boolean(),
    })

    static UPDATE_BIAYA_ADMINISTRASI = z.object({
        uuid: z.string().min(1, uuidRequired),
        statusBiayaLain: z.boolean(),
    })
}
