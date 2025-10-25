import { InvalidParamError } from '../../../errors/InvalidParamError';
import { MissingParamError } from '../../../errors/MissingParamError';

export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
  birthdate: Date;
};

export class User {
  private constructor(private props: UserProps) {
    this.validate();
  }

  public static create(
    name: string,
    email: string,
    password: string,
    birthdate: Date,
    token: string,
  ) {
    return new User({
      id: crypto.randomUUID().toString(),
      name,
      email,
      password,
      birthdate,
      token,
    });
  }

  public static with(props: UserProps) {
    return new User(props);
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get email() {
    return this.props.email;
  }

  public get password() {
    return this.props.password;
  }

  public get birthdate() {
    return this.props.birthdate
  }

  public get token() {
    return this.props.token;
  }

  public changePassword(newPassword: string) {
    this.props.password = newPassword;
  }

  private validatePassword(password: string): { success: boolean, message: string } {
    if (!password) {
      return { success: false, message: 'Please provide a password' };
    }

    if (password.length < 8) {
      return {
        success: false,
        message: 'Password must be at least 8 characters long',
      };
    }

    if (password.length > 64) {
      return {
        success: false,
        message: 'Password must not exceed 64 characters',
      };
    }

    if (!/[A-Z]/.test(password)) {
      return {
        success: false,
        message: 'Password must contain at least one uppercase letter',
      };
    }

    if (!/[a-z]/.test(password)) {
      return {
        success: false,
        message: 'Password must contain at least one lowercase letter',
      };
    }

    if (!/[0-9]/.test(password)) {
      return {
        success: false,
        message: 'Password must contain at least one number',
      };
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-+=\\[\];'`~]/.test(password)) {
      return {
        success: false,
        message: 'Password must contain at least one special character',
      };
    }

    if (/^\s+$/.test(password)) {
      return { success: false, message: 'Password cannot be only spaces.' };
    }

    return { success: true, message: 'Password is valid.' };
  }

  private validate() {
    if (!this.props.email || this.props.email.length <= 0) {
      const missingParamError = MissingParamError.create(
        'Email not provided',
        'Please provide your email',
        400,
        'Email',
      );
      missingParamError.throwErr();
    }
    
    const passwordValidation = this.validatePassword(this.props.password)

    if (!passwordValidation.success) {
      const invalidParamError = InvalidParamError.create(
        passwordValidation.message,
        passwordValidation.message,
        400,
        "password"
      )
      invalidParamError.throwErr()
    }

    if (!this.props.name || this.props.name.length <= 0) {
      const missingParamError = MissingParamError.create(
        'Name not provided',
        'Please provide your name',
        400,
        'Name',
      );
      missingParamError.throwErr();
    }

    if (!this.props.birthdate) {
      const missingParamError = MissingParamError.create(
        'Birthdate not provided',
        undefined,
        400,
        'birthdate',
      );
      missingParamError.throwErr();
    }

    if (!this.props.token || this.props.token.length <= 0) {
      const missingParamError = MissingParamError.create(
        'Token not provided',
        undefined,
        400,
        'token',
      );
      missingParamError.throwErr();
    }
  }
}
