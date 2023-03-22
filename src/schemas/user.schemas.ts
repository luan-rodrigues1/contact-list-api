import { z } from "zod"
import { contactSchema } from "./contact.schema"

const createUserSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    cell_phone: z.string(),
    password: z.string()
})

const updateUserSchema = createUserSchema.partial()

const returnUserSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3).max(50),
    email: z.string().email(),
    cell_phone: z.string(),
    profile_picture: z.string().nullable(),
    created_at: z.date(),
    updated_at: z.date(),
    deleted_at: z.date().or(z.string().nullable()),
    is_active: z.boolean(),
})

const returnUserContactsSchema = returnUserSchema.extend({
    contacts: z.array(contactSchema)
});

const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export {createUserSchema, returnUserSchema, updateUserSchema, loginUserSchema, returnUserContactsSchema}