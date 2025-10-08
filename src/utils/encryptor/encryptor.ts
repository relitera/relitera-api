export interface Encryptor {
    encrypt(stringToEncrypt: string): Promise<string>;
    compare(encrypted: string, raw: string): Promise<boolean>;
}