import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors"
import { ICreateContact, IReturnContact } from "../../interfaces/contacts"


const createContactService = async (payload: ICreateContact, userId: string): Promise<IReturnContact> => {
    const contactRepo = AppDataSource.getRepository(Contact)
    const userRepo = AppDataSource.getRepository(User)

    const queryBuilderContact = contactRepo.createQueryBuilder("contact")
    .where("contact.email = :email AND contact.cell_phone = :cellPhone", {
      email: payload.email,
      cellPhone: payload.cell_phone
    })
    .select("contact.id")

    const existingContact = await queryBuilderContact.getOne()

    if (existingContact){
        throw new AppError("There is already a user in your contacts with the same email and cell phone", 409)
    }

    const searchUser = await userRepo.findOneBy({id: userId})

    const queryBuilder = userRepo.createQueryBuilder("user")
    .where("user.email = :email AND user.cell_phone = :cellPhone", {
      email: payload.email,
      cellPhone: payload.cell_phone
    })
    .select("user.profile_picture")

    const existingUser = await queryBuilder.getOne()

    if (existingUser) {
        const newData = { ...payload, ...existingUser}

        const contact = contactRepo.create(newData)
        await contactRepo.save(contact)
        await contactRepo.update(
            {
                id: contact.id
            },
            {
                user: searchUser!
            }
        )
        return contact
    } else {
        const contact = contactRepo.create(payload)
        await contactRepo.save(contact)
        await contactRepo.update(
            {
                id: contact.id
            },
            {
                user: searchUser!
            }
        )
        return contact
    }

}

export default createContactService