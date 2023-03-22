import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"
import { IUpdateContact } from "../../interfaces/contacts"
import { returnContactSchema } from "../../schemas/contact.schema"

const updateContactService = async (payload: IUpdateContact, userId: string ,contactId: string) => {
    const contactRepo = AppDataSource.getRepository(Contact)
    const userRepo = AppDataSource.getRepository(User)

    const searchContact = await contactRepo.findOneBy({id: contactId})

    const queryBuilderContact = contactRepo.createQueryBuilder("contact")
    .where("contact.email = :email AND contact.cell_phone = :cellPhone", {
      email: payload.email,
      cellPhone: payload.cell_phone
    })
    .select("contact.id")

    const existingContact = await queryBuilderContact.getOne()

    if (existingContact && (searchContact?.email !== payload.email && searchContact?.cell_phone !== payload.cell_phone)){
        throw new AppError("There is already a user in your contacts with the same email and cell phone", 409)
    }


    const updateContact = contactRepo.create({
        ...searchContact,
        ...payload

    })

    await contactRepo.save(updateContact)

    const queryBuilder = userRepo.createQueryBuilder("user")
    .where("user.email = :email AND user.cell_phone = :cellPhone", {
      email: updateContact.email,
      cellPhone: updateContact.cell_phone
    })
    .select("user.profile_picture")

    const existingUser = await queryBuilder.getOne()

    if (existingUser) {

        const updateContact = contactRepo.create({
            ...searchContact,
            ...existingUser
        })
    
        await contactRepo.save(updateContact)
        const contactReturn = returnContactSchema.parse(updateContact)
        return contactReturn
    }


    const contactReturn = returnContactSchema.parse(updateContact)
    return contactReturn

}

export default updateContactService