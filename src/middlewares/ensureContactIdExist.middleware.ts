import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities/contact.entity";
import { AppError } from "../errors";


const ensureContactIdExistMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const contactRepo = AppDataSource.getRepository(Contact)

    const searchTask =  await contactRepo.findOneBy({ id: req.params.id });

    if(!searchTask){
        throw new AppError("Contact not found", 404)
    }

    return next()
}

export default ensureContactIdExistMiddleware