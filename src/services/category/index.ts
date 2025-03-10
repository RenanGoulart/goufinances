import { categoriesSchema } from "@/src/database/schemas/category.schema"
import { useDatabase } from "../database"
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";

export const useCategory = () => {
  const database = useDatabase(categoriesSchema);

  const { data } = useLiveQuery(
    database.select().from(categoriesSchema)
  );

  const handleCreate = async (name: string) => {
    await database.insert(categoriesSchema).values({ name });
  }

  const handleDelete = async (ids: number[]) => {
      if (!ids.length) return;
  
      for (const id of ids) {
        await database.delete(categoriesSchema).where(eq(categoriesSchema.id, id));
      }
    }

  return { data, handleCreate, handleDelete }
}