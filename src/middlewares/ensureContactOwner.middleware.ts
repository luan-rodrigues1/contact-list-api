import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities/contact.entity";
import { AppError } from "../errors";

const ensureContactOwnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const contactRepo = AppDataSource.getRepository(Contact)

    const userId: string = req.user.id 
    const contactId: string = req.params.id

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

    return next()

}

export default ensureContactOwnerMiddleware