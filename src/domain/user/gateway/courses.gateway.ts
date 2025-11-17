import { Decimal } from "@prisma/client/runtime/library";
import { User } from "../entity/user";

export interface CoursesGateway {
    getAll(): Promise<{
        id: string;
        name: string;
        description: string;
        price: Decimal;
    }[]>
    buyCourse(userId: string, courseId: string): Promise<boolean>
    getUserCourses(userId: string): Promise<any>
}