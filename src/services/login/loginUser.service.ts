import "dotenv/config"
import { compare } from "bcryptjs"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"
import { ILoginUser } from "../../interfaces/users"
import jwt from "jsonwebtoken"

const loginUserService = async (payload: ILoginUser): Promise<string> => {
    const userRepo = AppDataSource.getRepository(User)

    const searchUser =  await userRepo.findOne({
        where: {
            email: payload.email 
        },
        withDeleted: true
    });

    if(!searchUser){
        throw new AppError("user or password invalid", 403) 
    }

    if(!searchUser.is_active){
        throw new AppError("user no actived", 400) 
    }

    const passwordMatch = await compare(payload.password, searchUser.password)

    if(!passwordMatch){
        throw new AppError("user or password invalid", 403) 
    }

    const token = jwt.sign(
        {
            id: searchUser.id
        },
        process.env.SECRET_KEY as string,
        {
            subject: searchUser.id,
            expiresIn: "24h"
        }
    )

    return token
    
}

export default loginUserService