import { z } from "zod"
import { contactSchema, returnContactSchema } from "./contact.schema"

const phoneRegExp = /^\(\d{2}\) \d{5}-\d{4}$/;

const createUserSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    cell_phone: z.string().refine((value) => phoneRegExp.test(value), {
        message: 'Invalid phone format',
    }),
    password: z.string()
})

const updateUserSchema = createUserSchema.omit({password: true}).partial()

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
    contacts: z.array(returnContactSchema)
});

const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export {createUserSchema, returnUserSchema, updateUserSchema, loginUserSchema, returnUserContactsSchema, phoneRegExp}