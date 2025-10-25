import { User } from "../entity/user";

export interface UserGateway {
    save(user: User): Promise<void>
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        birthdate: Date | null;
        token: string;
    }>
    findById(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        birthdate: Date | null;
        token: string;
    }>
    deleteByEmail(email: string): Promise<{
        email: string,
        id: string
    } | null>
    updateToken(newToken: string, userId: string): Promise<void>
}