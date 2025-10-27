"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesRepositoryPrisma = void 0;
class CoursesRepositoryPrisma {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    static create(prismaClient) {
        return new CoursesRepositoryPrisma(prismaClient);
    }
    async getAll() {
        const courses = await this.prismaClient.courses.findMany();
        return courses;
    }
}
exports.CoursesRepositoryPrisma = CoursesRepositoryPrisma;
