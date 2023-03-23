import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { AppError } from "../../errors"
import { IReturnContact } from "../../interfaces/contacts"
import { returnContactSchema } from "../../schemas/contact.schema"

const ContactByIdService = async (contactId: string): Promise<IReturnContact> => {
    const contactRepo = AppDataSource.getRepository(Contact)

    const searchContact = await contactRepo.findOneBy({id: contactId})

    const contactReturn = returnContactSchema.parse(searchContact)

    return contactReturn
}

export default ContactByIdService