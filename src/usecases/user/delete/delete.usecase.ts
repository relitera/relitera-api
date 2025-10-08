import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { MissingParamError } from "../../../errors/MissingParamError";
import { Usecase } from "../../usecase";

export type DeleteUserInputDto = {
    email: string;
}

export type DeleteUserOutputDto = {
    deleted_at: Date;
    email: string;
    id: string;
}

export class DeleteUserUsecase implements Usecase<DeleteUserInputDto, DeleteUserOutputDto> {
    private constructor(
        private readonly userGateway: UserGateway
    ) {}

    public static create(userGateway: UserGateway) {
        return new DeleteUserUsecase(userGateway)
    }

    public async execute(
        data: DeleteUserInputDto
    ): Promise<DeleteUserOutputDto> {
        if (!data.email) {
            const missingParamError = MissingParamError.create(
                'Email is required',
                undefined,
                400,
                'email'
            )
            missingParamError.throwErr()
        }

        const userDeleted = await this.userGateway.deleteByEmail(data.email.toLowerCase())
        
        const currentTimestamp = new Date()

        if (!userDeleted) throw new Error("User not found")

        const output = this.presentOutput({
            email: data.email,
            id: userDeleted.id,
            deleted_at: currentTimestamp
        })

        return output
    }

    private presentOutput(data: DeleteUserOutputDto): DeleteUserOutputDto {
        const output = {
            email: data.email,
            deleted_at: data.deleted_at,
            id: data.id
        }

        return output
    }
}