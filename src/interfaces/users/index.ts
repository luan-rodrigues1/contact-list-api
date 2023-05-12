import { DeepPartial } from "typeorm"
import { z } from "zod"
import { createUserSchema, returnUserSchema, loginUserSchema, returnUserContactsSchema } from "../../schemas/user.schemas"

type ICreateUser = z.infer<typeof createUserSchema>
type IReturnUser = z.infer<typeof returnUserSchema>
type IUpdateUser = DeepPartial<Omit<ICreateUser, 'password'>>
type ILoginUser = z.infer<typeof loginUserSchema>
type IInfoUser = z.infer<typeof returnUserContactsSchema>

export {ICreateUser, IReturnUser, IUpdateUser, ILoginUser, IInfoUser}