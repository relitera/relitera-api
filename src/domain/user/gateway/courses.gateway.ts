import { Decimal } from "@prisma/client/runtime/library";
import { User } from "../entity/user";

export interface CoursesGateway {
    getAll(): Promise<{
        id: string;
        name: string;
        description: string;
        price: Decimal;
        thumb_url: string | null;
    }[]>
    buyCourse(userId: string, courseIds: string[]): Promise<boolean>
    getUserCourses(userId: string): Promise<any>
}