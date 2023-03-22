import {Router} from "express"
import { createdUserController, infoUserController, updateUserController } from "../controllers/users.controllers"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import ensureDataIsValidMiddleware from "../middlewares/ensureDatalsValid.middleware"
import { createUserSchema, updateUserSchema } from "../schemas/user.schemas"

const userRoutes = Router()

userRoutes.post("", ensureDataIsValidMiddleware(createUserSchema), createdUserController)
userRoutes.get("", ensureAuthMiddleware, infoUserController)
userRoutes.patch("", ensureAuthMiddleware, ensureDataIsValidMiddleware(updateUserSchema), updateUserController)

export default userRoutes