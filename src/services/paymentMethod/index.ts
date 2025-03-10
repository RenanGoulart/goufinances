
import { useDatabase } from "../database"
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { paymentMethodsSchema } from "@/src/database/schemas/paymentMethod.schema";

export const usePaymentMethod = () => {
  const database = useDatabase(paymentMethodsSchema);

  const { data } = useLiveQuery(
    database.select().from(paymentMethodsSchema)
  );

  const handleCreate = async (name: string) => {
    await database.insert(paymentMethodsSchema).values({ name });
  }

  const handleDelete = async (ids: number[]) => {
      if (!ids.length) return;
  
      for (const id of ids) {
        await database.delete(paymentMethodsSchema).where(eq(paymentMethodsSchema.id, id));
      }
    }

  return { data, handleCreate, handleDelete }
}