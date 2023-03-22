import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { ICreateUser, IReturnUser } from "../../interfaces/users";
import { createUserSchema } from "../../schemas/user.schemas";
import { returnUserSchema } from "../../schemas/user.schemas";

const createUserService = async (payload: ICreateUser): Promise<IReturnUser> => {
    const userRepo = AppDataSource.getRepository(User)

    const searchEmail =  await userRepo.findOne({
        where: {
            email: payload.email
        },
        withDeleted: true
    });

    if(searchEmail){
        throw new AppError("E-mail already registered", 409)
    }

    const searchCellPhone =  await userRepo.findOne({
        where: {
            cell_phone: payload.cell_phone
        },
        withDeleted: true
    });

    if(searchCellPhone){
        throw new AppError("Cell phone already registered", 409)
    }

    const user = userRepo.create(payload)
    await userRepo.save(user)

    const userWithoutPassword = returnUserSchema.parse(user)

    return userWithoutPassword
}

export default createUserService