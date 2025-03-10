import { z } from "./zod";

export const CategoryFormSchema = z.object({
  name: z.string().min(3),
})

export type CategoryForm = z.infer<typeof CategoryFormSchema>;