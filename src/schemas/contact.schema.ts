import { z } from "zod";
import { phoneRegExp } from "./user.schemas";

const contactSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(50),
  description: z.string().nullable().optional(),
  email: z.string().email(),
  cell_phone: z.string().refine((value) => phoneRegExp.test(value), {
        message: 'Invalid phone format',
    }),
  profile_picture: z.string().nullable().optional(),
  created_at: z.date(),
  updated_at: z.date(),
  user: z.object({
    id: z.string().uuid(),
  }),
});

const createContactSchema = contactSchema.omit({
  id: true,
  profile_picture: true,
  created_at: true,
  updated_at: true,
  user: true
})

const returnContactSchema = contactSchema.omit({user: true})

const updateContactSchema = createContactSchema.partial()


export {contactSchema, createContactSchema, returnContactSchema, updateContactSchema}