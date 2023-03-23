import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { AppError } from "../../errors"

const deleteContactService = async (contactId: string) => {
    const contactRepo = AppDataSource.getRepository(Contact)
    
    const searchContact = await contactRepo.findOneBy({id: contactId})

    return await contactRepo.delete(searchContact!.id)
}

export default deleteContactService