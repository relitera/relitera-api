"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryPrisma = void 0;
class UserRepositoryPrisma {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    static create(prismaClient) {
        return new UserRepositoryPrisma(prismaClient);
    }
    async save(user) {
        const data = {
            id: user.id,
            email: user.email,
            name: user.name,
            password: user.password,
            birthdate: user.birthdate,
            token: user.token
        };
        await this.prismaClient.users.create({
            data,
        });
    }
    async findByEmail(email) {
        const user = await this.prismaClient.users.findUnique({
            where: { email: email },
        });
        console.log(email);
        console.log(user);
        return {
            id: user && user.id ? user.id : '',
            email: user && user.email ? user.email : '',
            name: user && user.name ? user.name : '',
            password: user && user.password ? user.password : '',
            birthdate: user ? user.birthdate : null,
            token: user && user.token ? user.token : ''
        };
    }
    async findById(id) {
        const user = await this.prismaClient.users.findUnique({
            where: { id: id },
        });
        return {
            id: user && user.id ? user.id : '',
            email: user && user.email ? user.email : '',
            name: user && user.name ? user.name : '',
            password: user && user.password ? user.password : '',
            birthdate: user ? user.birthdate : null,
            token: user && user.token ? user.token : ''
        };
    }
    async deleteByEmail(email) {
        const user = await this.prismaClient.users.delete({
            where: { email: email },
        });
        if (!user.email)
            return null;
        return {
            email: user.email,
            id: user.id,
        };
    }
    async updateToken(newToken, userId) {
        await this.prismaClient.users.update({
            where: { id: userId },
            data: {
                token: newToken
            }
        });
    }
}
exports.UserRepositoryPrisma = UserRepositoryPrisma;
