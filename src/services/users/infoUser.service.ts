import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { IInfoUser, IReturnUser } from "../../interfaces/users"
import { returnUserContactsSchema } from "../../schemas/user.schemas"


const infoUserService = async (payload: string): Promise<IInfoUser> => {
    const userRepo = AppDataSource.getRepository(User)

    const contacts = await userRepo.createQueryBuilder('user')
    .leftJoinAndSelect('user.contacts', 'contact')
    .where('user.id = :userId', { userId: payload })
    .orderBy('contact.created_at', 'DESC')
    .getOneOrFail()
    
    const userWithoutPassword = returnUserContactsSchema.parse(contacts)
    
    return userWithoutPassword
}

export default infoUserService