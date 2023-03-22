import {Router} from "express"
import { createContactController, updateContactController } from "../controllers/contacts.controller"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import ensureContactIdExistMiddleware from "../middlewares/ensureContactIdExist.middleware"
import ensureDataIsValidMiddleware from "../middlewares/ensureDatalsValid.middleware"
import { createContactSchema, updateContactSchema } from "../schemas/contact.schema"

const contactRoutes = Router()

contactRoutes.post("", ensureAuthMiddleware, ensureDataIsValidMiddleware(createContactSchema), createContactController)
contactRoutes.patch("/:id", ensureAuthMiddleware, ensureContactIdExistMiddleware, ensureDataIsValidMiddleware(updateContactSchema), updateContactController)

export default contactRoutes