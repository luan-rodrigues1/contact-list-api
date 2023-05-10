import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"

const listUsercontactsService = async (userId: string, queryParameters: any) => {
    const contactRepo = AppDataSource.getRepository(Contact)
    
    let query = contactRepo.createQueryBuilder('contact')
    .where('contact.user.id = :userIdLogged', { userIdLogged: userId });

    if (queryParameters.search) {
        const searchParam = queryParameters.search.toLowerCase().replace(/\s+/g, '', ' ')
        
        query = query.andWhere(
            `(LOWER(REPLACE(contact.name, ' ', '')) = :searchParam AND contact.user.id = :userIdLogged) OR (LOWER(REPLACE(contact.description, ' ', '')) = :searchParam AND contact.user.id = :userIdLogged) OR (LOWER(REPLACE(contact.email, ' ', '')) = :searchParam AND contact.user.id = :userIdLogged) OR (LOWER(REPLACE(contact.cell_phone, ' ', '')) = :searchParam AND contact.user.id = :userIdLogged)`,
          { searchParam }
        )
    }

    const listContact = await query.getMany();

    return listContact
};


export default listUsercontactsService