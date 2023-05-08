import { SelectQueryBuilder } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"
import { ICreateContact, IReturnContact } from "../../interfaces/contacts"
import { returnContactSchema } from "../../schemas/contact.schema"


const createContactService = async (payload: ICreateContact, userId: string) => {
    const contactRepo = AppDataSource.getRepository(Contact)
    const userRepo = AppDataSource.getRepository(User)

    const emailInUse = await contactRepo.findOneBy({user: {id: userId}, email: payload.email})
    const cellPhoneInUse = await contactRepo.findOneBy({user: {id: userId}, cell_phone: payload.cell_phone})
    
    if (emailInUse) {
        throw new AppError("There is already a contact with this email", 409)
    }

    if (cellPhoneInUse) {
        throw new AppError("There is already a contact with this cell phone", 409)
    }

    const registeredUserEmail = await userRepo.findOneBy({email: payload.email}) 
    const registeredUserPhone = await userRepo.findOneBy({cell_phone: payload.cell_phone})

    const searchUser = await userRepo.findOneBy({id: userId})
    const contact = contactRepo.create(payload)
    await contactRepo.save(contact)

    if (registeredUserEmail?.id === registeredUserPhone?.id) {
        await contactRepo.update(contact.id, {profile_picture: registeredUserEmail?.profile_picture, user: searchUser!})
        const contactUpdatePhoto = await contactRepo.findOneBy({id: contact.id})
        const contactValidation = returnContactSchema.parse(contactUpdatePhoto)

        return contactValidation
    }

    const contactReturn = returnContactSchema.parse(contact)

    return contactReturn

}

export default createContactService