import { z } from './zod';

export const PaymentMethodFormSchema = z.object({
  name: z.string().min(3),
})

export type PaymentMethodForm = z.infer<typeof PaymentMethodFormSchema>;