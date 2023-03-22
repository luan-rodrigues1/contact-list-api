import {Router} from "express"
import { createContactController } from "../controllers/contacts.controller"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import ensureDataIsValidMiddleware from "../middlewares/ensureDatalsValid.middleware"
import { createContactSchema } from "../schemas/contact.schema"

const contactRoutes = Router()

contactRoutes.post("", ensureAuthMiddleware, ensureDataIsValidMiddleware(createContactSchema), createContactController)

export default contactRoutes