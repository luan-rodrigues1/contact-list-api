import { Request, Response } from "express";
import { ICreateContact, IUpdateContact } from "../interfaces/contacts";
import ContactByIdService from "../services/contacts/ContactById.service";
import createContactService from "../services/contacts/createContact.service";
import deleteContactService from "../services/contacts/deleteContact.service";
import updateContactService from "../services/contacts/updateContact.service";

const createContactController = async (req: Request, res: Response) => {
    const contactData: ICreateContact = req.body
    const userId: string = req.user.id 
    const newUser = await createContactService(contactData, userId)
    return res.status(201).json(newUser)
}

const ContactByIdController = async (req: Request, res: Response) => {
    const userId: string = req.user.id 
    const contactId: string = req.params.id
    const infoUser = await ContactByIdService(userId, contactId)
    return res.status(200).json(infoUser)
}

const updateContactController = async (req: Request, res: Response) => {
    const contactData: IUpdateContact = req.body
    const userId: string = req.user.id 
    const contactId: string = req.params.id
    const updateUser = await updateContactService(contactData, userId, contactId)
    return res.status(200).json(updateUser)
}

const deleteContactController = async (req: Request, res: Response) => {
    const userId: string = req.user.id 
    const contactId: string = req.params.id
    const deleteUser = await deleteContactService(userId, contactId)
    return res.status(204).json(deleteUser)
}

export {createContactController, updateContactController, ContactByIdController, deleteContactController}