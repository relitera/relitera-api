import config from "../../config/config";
import { Encryptor } from "./encryptor";
import bcrypt from "bcrypt"

export class EncryptorBcrypt implements Encryptor {
    private constructor() {}

    public static create() {
        return new EncryptorBcrypt()
    }

    public async encrypt(stringToEncrypt: string): Promise<string> {
        const salt = await bcrypt.genSalt(config.saltRounds)

        const hashedPassword: string = await bcrypt.hash(stringToEncrypt, salt)
        
        return hashedPassword
    }

    public async compare(encrypted: string, rawString: string): Promise<boolean> {
        const isEqual: boolean = await bcrypt.compare(rawString, encrypted)

        if (!isEqual) return false
        
        return true
    }
}