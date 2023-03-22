import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { IInfoUser, IReturnUser } from "../../interfaces/users"
import { returnUserContactsSchema } from "../../schemas/user.schemas"


const infoUserService = async (payload: string): Promise<IInfoUser> => {
    const userRepo = AppDataSource.getRepository(User)

    const searchUser =  await userRepo.findOne({
        where: {
            id: payload
        },
        relations: {
            contacts: true
        }
    })

    const userWithoutPassword = returnUserContactsSchema.parse(searchUser)
    
    return userWithoutPassword
}

export default infoUserService