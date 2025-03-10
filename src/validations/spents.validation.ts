import { z } from './zod';

export const SpentFormSchema = z.object({
  description: z.string(),
  total_value: z.string(),
  total_installments: z.string(),
  category_id: z.number(),
  payment_method_id: z.number(),
  date: z.string(),
})

export type SpentForm = z.infer<typeof SpentFormSchema>;