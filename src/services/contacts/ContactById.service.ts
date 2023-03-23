import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { AppError } from "../../errors"
import { IReturnContact } from "../../interfaces/contacts"
import { returnContactSchema } from "../../schemas/contact.schema"

const ContactByIdService = async (userId: string, contactId: string): Promise<IReturnContact> => {
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

    const contactReturn = returnContactSchema.parse(searchContact)

    return contactReturn
}

export default ContactByIdService