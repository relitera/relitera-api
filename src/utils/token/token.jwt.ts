import jwt from "jsonwebtoken"
import config from "../../config/config"
import { TokenI } from "./token"

export class TokenJWT implements TokenI {
    private constructor() {}

    public static create() {
        return new TokenJWT()
    }

    async generate(data: any): Promise<string | undefined> {
        if (data && config.tokenKey) {
            const token = await jwt.sign(data, config.tokenKey)
            return token
        }
    }

    async decode(token: string): Promise<any | undefined> {
        if (token && config.tokenKey) {
            try {
                const decoded = await jwt.verify(token, config.tokenKey)
                return decoded
            } catch (error) {
                console.error("Token verification failed:", error)
                return undefined
            }
        }
        return undefined
    }
}