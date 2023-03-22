import { z } from "zod"
import { createUserSchema, returnUserSchema } from "../../schemas/user.schemas"

type ICreateUser = z.infer<typeof createUserSchema>
type IreturnUser = z.infer<typeof returnUserSchema>

export {ICreateUser, IreturnUser}