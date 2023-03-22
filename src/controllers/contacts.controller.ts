import { Request, Response } from "express";
import { ICreateContact } from "../interfaces/contacts";
import createContactService from "../services/contacts/createContact.service";

const createContactController = async (req: Request, res: Response) => {
    const contactData: ICreateContact = req.body
    const userId: string = req.user.id 
    const newUser = await createContactService(contactData, userId)
    return res.status(201).json(newUser)
}

export {createContactController}