import {Router} from "express"
import loginUserController from "../controllers/login.controllers"
import ensureDataIsValidMiddleware from "../middlewares/ensureDatalsValid.middleware"
import { loginUserSchema } from "../schemas/user.schemas"

const loginRoutes = Router()

loginRoutes.post("", ensureDataIsValidMiddleware(loginUserSchema), loginUserController)

export default loginRoutes