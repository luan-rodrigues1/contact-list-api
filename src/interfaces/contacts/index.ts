import { DeepPartial } from "typeorm"
import { z } from "zod"
import { createContactSchema, returnContactSchema } from "../../schemas/contact.schema"

type ICreateContact = z.infer<typeof createContactSchema>
type IUpdateContact = DeepPartial<ICreateContact>
type IReturnContact = z.infer<typeof returnContactSchema>

export { ICreateContact, IUpdateContact, IReturnContact }