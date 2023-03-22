import { z } from "zod";

const contactSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(50),
  description: z.string().nullable().optional(),
  email: z.string().email(),
  cell_phone: z.string(),
  profile_picture: z.string().nullable().optional(),
  created_at: z.date(),
  updated_at: z.date(),
  user: z.object({
    id: z.string().uuid(),
  }),
});


export {contactSchema}