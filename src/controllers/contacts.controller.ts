import { Request, Response } from "express";
import { ICreateContact, IUpdateContact } from "../interfaces/contacts";
import ContactByIdService from "../services/contacts/ContactById.service";
import createContactService from "../services/contacts/createContact.service";
import deleteContactService from "../services/contacts/deleteContact.service";
import listUsercontactsService from "../services/contacts/listUsercontacts.service";
import updateContactService from "../services/contacts/updateContact.service";

const createContactController = async (req: Request, res: Response) => {
    const contactData: ICreateContact = req.body
    const userId: string = req.user.id 
    const newContact = await createContactService(contactData, userId)
    return res.status(201).json(newContact)
}

const listUsercontactsController = async (req: Request, res: Response) => {
    const userId: string = req.user.id 
    const listContact = await listUsercontactsService(userId)
    return res.status(200).json(listContact)
}

const ContactByIdController = async (req: Request, res: Response) => {
    const contactId: string = req.params.id
    const infoContact = await ContactByIdService(contactId)
    return res.status(200).json(infoContact)
}

const updateContactController = async (req: Request, res: Response) => {
    const contactData: IUpdateContact = req.body
    const contactId: string = req.params.id
    const updateContact = await updateContactService(contactData, contactId)
    return res.status(200).json(updateContact)
}

const deleteContactController = async (req: Request, res: Response) => {
    const contactId: string = req.params.id
    const deleteContact = await deleteContactService(contactId)
    return res.status(204).json(deleteContact)
}

export {createContactController, updateContactController, ContactByIdController, deleteContactController, listUsercontactsController}