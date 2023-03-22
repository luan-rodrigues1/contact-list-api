import { z } from "zod"

const createUserSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    cell_phone: z.string(),
    password: z.string()
})

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

export {createUserSchema, returnUserSchema}