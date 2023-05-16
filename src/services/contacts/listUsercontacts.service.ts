import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"

const listUsercontactsService = async (userId: string, queryParameters: any) => {
    const contactRepo = AppDataSource.getRepository(Contact)
    
    let query = contactRepo.createQueryBuilder('contact')
    .where('contact.user.id = :userIdLogged', { userIdLogged: userId });

    if (queryParameters.search) {
        const searchParam = queryParameters.search.toLowerCase().replace(/\s+/g, '', ' ')

        query = query.andWhere(
            `(LOWER(REPLACE(contact.name, ' ', '')) LIKE :searchParam AND contact.user.id = :userIdLogged) OR (LOWER(REPLACE(contact.description, ' ', '')) LIKE :searchParam AND contact.user.id = :userIdLogged) OR (LOWER(REPLACE(contact.email, ' ', '')) LIKE :searchParam AND contact.user.id = :userIdLogged) OR (LOWER(REPLACE(contact.cell_phone, ' ', '')) LIKE :searchParam AND contact.user.id = :userIdLogged)`,
          { searchParam: `%${searchParam}%` }
        )
        
    }

    query = query.orderBy('contact.created_at', 'DESC');

    const listContact = await query.getMany();

    return listContact
};


export default listUsercontactsService