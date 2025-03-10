import Button from "@/src/components/Button";
import Checkbox from "@/src/components/Checkbox";
import Input from "@/src/components/Input";
import { theme } from "@/src/global/theme";
import { usePaymentMethod } from "@/src/services/paymentMethod";
import { PaymentMethodForm, PaymentMethodFormSchema } from "@/src/validations/paymentMethod.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function PaymentMethods() {
  const [selected, setSelected] = useState<number[]>([]);

  const { data, handleCreate, handleDelete } = usePaymentMethod();

  const { control, handleSubmit, reset } = useForm<PaymentMethodForm>({
    resolver: zodResolver(PaymentMethodFormSchema),
  });

  const onSubmit = async (data: PaymentMethodForm) => {
    await handleCreate(data.name);
    reset();
  }

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
        <Text style={styles.title}>Métodos de pagamento</Text>
        <Pressable style={styles.deleteWrapper} onPress={onPressDelete}>
          <Text style={styles.deleteText}>Excluir</Text>
        </Pressable>
      </View>
      <Input
        control={control}
        name="name"
        placeholder="Nome do método de pagamento"
        autoCapitalize="words"
      />
      <Button onPress={handleSubmit(onSubmit)} >
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