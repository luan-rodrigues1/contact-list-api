import {Router} from "express"
import { createdUserController, deleteUserController, infoUserController, updateUserController, uploadUserController } from "../controllers/users.controllers"
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware"
import ensureDataIsValidMiddleware from "../middlewares/ensureDatalsValid.middleware"
import { createUserSchema, updateUserSchema } from "../schemas/user.schemas"
import multer from "multer"
import {storage, fileFilter} from "../config/multer.config"

const userRoutes = Router()
const upload = multer({storage: storage, fileFilter: fileFilter})

userRoutes.post("", ensureDataIsValidMiddleware(createUserSchema), createdUserController)
userRoutes.get("", ensureAuthMiddleware, infoUserController)
userRoutes.patch("", ensureAuthMiddleware, ensureDataIsValidMiddleware(updateUserSchema), updateUserController)
userRoutes.delete("", ensureAuthMiddleware, deleteUserController)
userRoutes.patch("/upload", ensureAuthMiddleware, upload.single('avatar'), uploadUserController)

export default userRoutes