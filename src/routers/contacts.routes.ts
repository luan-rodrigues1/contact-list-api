import {Router} from "express"
import { ContactByIdController, createContactController, deleteContactController, listUsercontactsController, updateContactController } from "../controllers/contacts.controller"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import ensureContactIdExistMiddleware from "../middlewares/ensureContactIdExist.middleware"
import ensureContactOwnerMiddleware from "../middlewares/ensureContactOwner.middleware"
import ensureDataIsValidMiddleware from "../middlewares/ensureDatalsValid.middleware"
import { createContactSchema, updateContactSchema } from "../schemas/contact.schema"

const contactRoutes = Router()

contactRoutes.post("", ensureAuthMiddleware, ensureDataIsValidMiddleware(createContactSchema), createContactController)
contactRoutes.get("", ensureAuthMiddleware, listUsercontactsController)
contactRoutes.get("/:id", ensureAuthMiddleware, ensureContactIdExistMiddleware, ensureContactOwnerMiddleware, ContactByIdController)
contactRoutes.patch("/:id", ensureAuthMiddleware, ensureContactIdExistMiddleware, ensureContactOwnerMiddleware, ensureDataIsValidMiddleware(updateContactSchema), updateContactController)
contactRoutes.delete("/:id", ensureAuthMiddleware, ensureContactIdExistMiddleware, ensureContactOwnerMiddleware, deleteContactController)

export default contactRoutes