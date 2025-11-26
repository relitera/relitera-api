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
        message: 'A senha precisa ter pelo menos 8 caracteres',
      };
    }

    if (password.length > 64) {
      return {
        success: false,
        message: 'A senha deve ter um máximo de 64 caracteres',
      };
    }

    if (!/[A-Z]/.test(password)) {
      return {
        success: false,
        message: 'A senha deve ter uma letra maiúscula',
      };
    }

    if (!/[a-z]/.test(password)) {
      return {
        success: false,
        message: 'A senha deve ter uma letra minúscula',
      };
    }

    if (!/[0-9]/.test(password)) {
      return {
        success: false,
        message: 'A senha deve ter pelo menos um númerp',
      };
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-+=\\[\];'`~]/.test(password)) {
      return {
        success: false,
        message: 'A senha deve ter um caractere especial',
      };
    }

    if (/^\s+$/.test(password)) {
      return { success: false, message: 'A senha está vazia.' };
    }

    return { success: true, message: 'Password is valid.' };
  }

  private validate() {
    if (!this.props.email || this.props.email.length <= 0) {
      const missingParamError = MissingParamError.create(
        'Email not provided',
        'Por favor forneça um email',
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
        'Por favor forneça seu nome',
        400,
        'Name',
      );
      missingParamError.throwErr();
    }

    if (!this.props.birthdate) {
      const missingParamError = MissingParamError.create(
        'Por favor forneça sua data de nascimento',
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
