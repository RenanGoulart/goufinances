import Button from "@/src/components/Button";
import Checkbox from "@/src/components/Checkbox";
import Input from "@/src/components/Input";
import { categoriesSchema } from "@/src/database/schemas/category.schema";
import { theme } from "@/src/global/theme";
import { eq } from "drizzle-orm";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function Categories() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema: { categoriesSchema } });

  const { data } = useLiveQuery(
    drizzleDb.select().from(categoriesSchema)
  );

  const [name, setName] = useState('');
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    if (selected.includes(id)) {
      return setSelected(selected.filter(item => item !== id));
    }
    return setSelected(prev => [...prev, id]);
  }

  const handleDelete = async () => {
    if (!selected.length) return;

    for (const id of selected) {
      await drizzleDb.delete(categoriesSchema).where(eq(categoriesSchema.id, id));
    }

    setSelected([])
  }

  const createCategory = async () => {
    if (!name) return;

    await drizzleDb.insert(categoriesSchema).values({ name });

    setName('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Categorias</Text>
        <Pressable style={styles.deleteWrapper} onPress={handleDelete}>
          <Text style={styles.deleteText}>Excluir</Text>
        </Pressable>
      </View>
      <Input
        value={name}
        setValue={setName}
        placeholder="Nome da categoria"
        autoCapitalize="words"
      />
      <Button onPress={createCategory} >
        Salvar
      </Button>

      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Pressable style={styles.option} onPress={() => handleSelect(item.id)}>
            <Text style={styles.optionText}>{item.id}</Text>
            <Text style={styles.optionText}>{item.name}</Text>
            <Checkbox
              isChecked={selected.includes(item.id)}
              onPress={() => handleSelect(item.id)}
              style={{ marginLeft: 'auto' }}
            />
          </Pressable>
        )}
        contentContainerStyle={{ gap: 16 }}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 20,
    backgroundColor: '#000',

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff'
  },
  deleteWrapper: {
    padding: 16,
    paddingRight: 0
  },
  deleteText: {
    color: theme.colors.error.main,
  },
  option: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#fff',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  }
})