import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { AppError } from "../../errors"

const deleteContactService = async (userId: string, contactId: string) => {
    const contactRepo = AppDataSource.getRepository(Contact)
    
    const searchContact = await contactRepo.findOne({
        where: {
            id: contactId
        },
        relations: {
            user: true
        }
    })

    if (searchContact?.user.id !== userId) {
        throw new AppError("missing permissions", 401)
    }

    return await contactRepo.delete(searchContact!.id)
}

export default deleteContactService