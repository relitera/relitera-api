import { EmailValidatorI } from "./emailValidator";
import * as emailValidator from "email-validator"

export class EmailValidator implements EmailValidatorI {
    private constructor() {}

    public static create() {
        return new EmailValidator()
    }

    public validate(email: string): boolean {
        const isValid = emailValidator.validate(email)

        if (!isValid) return false

        return true
    }
}