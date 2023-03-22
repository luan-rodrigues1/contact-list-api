import {Router} from "express"
import { createdUserController } from "../controllers/users.controllers"
import ensureDataIsValidMiddleware from "../middlewares/ensureDatalsValid.middleware"
import { createUserSchema } from "../schemas/user.schemas"

const userRoutes = Router()

userRoutes.post("", ensureDataIsValidMiddleware(createUserSchema), createdUserController)

export default userRoutes