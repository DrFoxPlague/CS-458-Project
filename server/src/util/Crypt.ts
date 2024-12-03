import Cryptr from "cryptr";

const { CRYPT_SECRET } = process.env;
if (!CRYPT_SECRET) throw new Error("No CRYPT_SECRET provided in .env");

const crypt = new Cryptr(CRYPT_SECRET);

export const encrypt = (data: string) => crypt.encrypt(data);
export const decrypt = (data: string) => crypt.decrypt(data);
