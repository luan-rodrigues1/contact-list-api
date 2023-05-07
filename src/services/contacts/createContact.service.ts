import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"
import { ICreateContact, IReturnContact } from "../../interfaces/contacts"
import { returnContactSchema } from "../../schemas/contact.schema"


const createContactService = async (payload: ICreateContact, userId: string): Promise<IReturnContact> => {
    const contactRepo = AppDataSource.getRepository(Contact)
    const userRepo = AppDataSource.getRepository(User)

    const emailInUse = await contactRepo.findOneBy({email: payload.email})
    const cellPhoneInUse = await contactRepo.findOneBy({cell_phone: payload.cell_phone})

    if (emailInUse) {
        throw new AppError("There is already a contact with this email", 409)
    }

    if (cellPhoneInUse) {
        throw new AppError("There is already a contact with this cell phone", 409)
    }

    const registeredUserEmail = await userRepo.findOneBy({email: payload.email}) 
    const registeredUserPhone = await userRepo.findOneBy({cell_phone: payload.cell_phone})

    const contact = contactRepo.create(payload)
    await contactRepo.save(contact)

    if (registeredUserEmail?.id === registeredUserPhone?.id) {
        await contactRepo.update(contact.id, {profile_picture: registeredUserEmail?.profile_picture})
        const contactUpdatePhoto = await contactRepo.findOneBy({id: contact.id})
        const contactValidation = returnContactSchema.parse(contactUpdatePhoto)

        return contactValidation
    }

    const contactReturn = returnContactSchema.parse(contact)

    return contactReturn

}

export default createContactService