import { useDatabase } from "../database"
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { spentsSchema } from "@/src/database/schemas/spent.schema";
import { SpentForm } from "@/src/validations/spents.validation";
import { normalizeCurrency } from "@/src/urils/format";

export const useSpent = () => {
  const database = useDatabase(spentsSchema);

  const { data } = useLiveQuery(
    database.select().from(spentsSchema)
  );

  const handleCreate = async ({ description, total_value, total_installments, category_id, payment_method_id, date }: SpentForm) => {
    const newDate = new Date(date);
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const normalizedValue = normalizeCurrency(total_value);

    const body ={ 
      description, 
      total_value: normalizedValue, 
      total_installments: Number(total_installments), 
      category_id, 
      payment_method_id, 
      date: newDate, 
      month, 
      year 
    }

    console.log('beforeeeee')
    
    try {

      console.log(JSON.stringify(body, null, 2))
      const resp = await database.insert(spentsSchema).values(body);
    } catch (e) {
      console.log('error', JSON.stringify(e, null, 2))
    }
  }

  const handleDelete = async (ids: number[]) => {
      if (!ids.length) return;
  
      for (const id of ids) {
        await database.delete(spentsSchema).where(eq(spentsSchema.id, id));
      }
    }

  return { data, handleCreate, handleDelete }
}