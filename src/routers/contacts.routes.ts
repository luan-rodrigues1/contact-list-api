import {Router} from "express"
import { ContactByIdController, createContactController, deleteContactController, updateContactController } from "../controllers/contacts.controller"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import ensureContactIdExistMiddleware from "../middlewares/ensureContactIdExist.middleware"
import ensureDataIsValidMiddleware from "../middlewares/ensureDatalsValid.middleware"
import { createContactSchema, updateContactSchema } from "../schemas/contact.schema"

const contactRoutes = Router()

contactRoutes.post("", ensureAuthMiddleware, ensureDataIsValidMiddleware(createContactSchema), createContactController)
contactRoutes.get("/:id", ensureAuthMiddleware, ensureContactIdExistMiddleware, ContactByIdController)
contactRoutes.patch("/:id", ensureAuthMiddleware, ensureContactIdExistMiddleware, ensureDataIsValidMiddleware(updateContactSchema), updateContactController)
contactRoutes.delete("/:id", ensureAuthMiddleware, ensureContactIdExistMiddleware, deleteContactController)

export default contactRoutes