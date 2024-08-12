import {z} from 'zod';
import {
    addressUuidRequired,
    codeRequired, emailRequired,
    faskesUuidRequired,
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
        logo: z.string(),
        bgWarna: z.string(),
    });
}
