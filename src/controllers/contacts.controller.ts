import { Request, Response } from "express";
import { ICreateContact, IUpdateContact } from "../interfaces/contacts";
import createContactService from "../services/contacts/createContact.service";
import updateContactService from "../services/contacts/updateContact.service";

const createContactController = async (req: Request, res: Response) => {
    const contactData: ICreateContact = req.body
    const userId: string = req.user.id 
    const newUser = await createContactService(contactData, userId)
    return res.status(201).json(newUser)
}

const updateContactController = async (req: Request, res: Response) => {
    const contactData: IUpdateContact = req.body
    const userId: string = req.user.id 
    const contactId: string = req.params.id
    const updateUser = await updateContactService(contactData, userId, contactId)
    return res.status(200).json(updateUser)
}

export {createContactController, updateContactController}