import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"

const listUsercontactsService = async (userId: string) => {
    const contactRepo = AppDataSource.getRepository(Contact)
    
    const listContact = await contactRepo.createQueryBuilder("contact")
    .where("contact.userId = :userIdLogged", {
      userIdLogged: userId
    })
    .getMany()

    return listContact
}

export default listUsercontactsService