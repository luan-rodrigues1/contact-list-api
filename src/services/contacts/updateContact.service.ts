import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"
import { IReturnContact, IUpdateContact } from "../../interfaces/contacts"
import { returnContactSchema } from "../../schemas/contact.schema"

const updateContactService = async (payload: IUpdateContact, contactId: string): Promise<IReturnContact> => {
    const contactRepo = AppDataSource.getRepository(Contact)
    const userRepo = AppDataSource.getRepository(User)

    const searchContact = await contactRepo.findOneBy({id: contactId})

    if (payload.email) {
        const duplicateEmail = await contactRepo.findOneBy({email: payload.email})

        if (searchContact?.email !== duplicateEmail?.email && duplicateEmail) {
            throw new AppError("There is already a contact with this email", 409)
        }

    }

    if (payload.cell_phone) {
        const duplicateCellPhone = await contactRepo.findOneBy({cell_phone: payload.cell_phone})

        if (searchContact?.email !== duplicateCellPhone?.email && duplicateCellPhone) {
            throw new AppError("There is already a contact with this cell phone", 409)
        }

    }

    await contactRepo.update(contactId, {...payload})

    const contactUpdate = await contactRepo.findOneBy({id: contactId})

    const registeredUserEmail = await userRepo.findOneBy({email: contactUpdate?.email!})
    const registeredUserPhone = await userRepo.findOneBy({cell_phone: contactUpdate?.cell_phone!})

    if (registeredUserEmail?.id === registeredUserPhone?.id) {
        await contactRepo.update(contactId, {profile_picture: registeredUserEmail?.profile_picture})

        const contactUpdatePhoto = await contactRepo.findOneBy({id: contactId})
        const contactValidation = returnContactSchema.parse(contactUpdatePhoto)

        return contactValidation
    }

    const contactValidation = returnContactSchema.parse(contactUpdate)

    return contactValidation

}

export default updateContactService