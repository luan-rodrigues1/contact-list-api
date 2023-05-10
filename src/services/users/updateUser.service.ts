import { hashSync } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IReturnUser, IUpdateUser } from "../../interfaces/users";
import { returnUserSchema } from "../../schemas/user.schemas";

const updateUserService = async (payload: IUpdateUser, userId: string): Promise<IReturnUser> => {
    const userRepo = AppDataSource.getRepository(User)    
    const searchUser =  await userRepo.findOneBy({ id: userId });

    if(payload.email){
        const searchEmail =  await userRepo.findOne({
            where: {
                email: payload.email
            },
            withDeleted: true
        });

        if(searchEmail && searchUser?.email !== searchEmail?.email){
            throw new AppError("A user with this email already exists", 409)
        }
    }

    if(payload.cell_phone){
        const searchCellPhone =  await userRepo.findOne({
            where: {
                cell_phone: payload.cell_phone
            },
            withDeleted: true
        });

        if(searchCellPhone && searchUser?.cell_phone !== searchCellPhone?.cell_phone){
            throw new AppError("A user with this cell Phone already exists", 409)
        }
    }

    if (payload.password) {
        payload.password = hashSync(payload.password, 10)
    }

    const updateUser = userRepo.create({
        ...searchUser,
        ...payload
    })

    await userRepo.save(updateUser)

    const userWithoutPassword = returnUserSchema.parse(updateUser)

    return userWithoutPassword
}

export default updateUserService