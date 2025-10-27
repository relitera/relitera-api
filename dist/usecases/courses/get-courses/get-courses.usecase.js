"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCoursesUsecase = void 0;
class GetCoursesUsecase {
    constructor(coursesGateway) {
        this.coursesGateway = coursesGateway;
    }
    static create(coursesGateway) {
        return new GetCoursesUsecase(coursesGateway);
    }
    async execute() {
        const coursesFound = await this.coursesGateway.getAll();
        const output = this.presentOutput(coursesFound);
        return output;
    }
    presentOutput(data) {
        const output = data.map((each) => {
            return {
                name: each.name,
                description: each.description,
                price: each.price,
                id: each.id
            };
        });
        return output;
    }
}
exports.GetCoursesUsecase = GetCoursesUsecase;
