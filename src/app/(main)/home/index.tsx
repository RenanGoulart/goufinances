import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "@/src/global/theme";
import { useSpent } from "@/src/services/spent";
import { formatCurrency } from "@/src/urils/format";
import Checkbox from "@/src/components/Checkbox";
import FormModal from "@/src/components/FormModal";
import Button from "@/src/components/Button";

export default function Home() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<number[]>([]);

  const { data, handleDelete } = useSpent();

  const handleSelect = (id: number) => {
    if (selected.includes(id)) {
      return setSelected(selected.filter(item => item !== id));
    }
    return setSelected(prev => [...prev, id]);
  }

  const onPressDelete = async () => {
    await handleDelete(selected);
    setSelected([]);
  }
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Despesas</Text>
        <Pressable style={styles.deleteWrapper} onPress={onPressDelete}>
          <Text style={styles.deleteText}>Excluir</Text>
        </Pressable>
      </View>

      <Button onPress={() => setOpenModal(true)}>Adicionar</Button>

      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Pressable style={styles.option} onPress={() => handleSelect(item.id)}>
            <Text style={styles.optionText}>{item.id}</Text>
            <Text style={styles.optionText}>{item.description}</Text>
            <Text style={[styles.optionText, { marginLeft: 'auto' }]}>{formatCurrency(item.total_value)}</Text>
            <Checkbox
              isChecked={selected.includes(item.id)}
              onPress={() => handleSelect(item.id)}
              style={{ marginLeft: 'auto' }}
            />
          </Pressable>
        )}
        contentContainerStyle={{ gap: 16 }}
      />

      <FormModal type='spent' isVisible={openModal} closeModal={() => setOpenModal(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  },
  label: {
    color: '#fff',
    fontSize: 16,
  }
})