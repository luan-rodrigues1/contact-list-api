import { DeepPartial } from "typeorm"
import { z } from "zod"
import { createUserSchema, returnUserSchema, loginUserSchema } from "../../schemas/user.schemas"

type ICreateUser = z.infer<typeof createUserSchema>
type IReturnUser = z.infer<typeof returnUserSchema>
type IUpdateUser = DeepPartial<ICreateUser>
type ILoginUser = z.infer<typeof loginUserSchema>

export {ICreateUser, IReturnUser, IUpdateUser, ILoginUser}