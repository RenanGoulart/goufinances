import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";

export const useDatabase = <T>(schema: T) => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema: { schema } });

  return drizzleDb;
}