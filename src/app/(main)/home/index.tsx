import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import TagOptions from "@/src/components/TagOptions";
import FakeInput from "@/src/components/FakeInput";
import { format } from "date-fns";
import { categoriesSchema } from "@/src/database/schemas/category.schema";
import { paymentMethodsSchema } from "@/src/database/schemas/paymentMethod.schema";
import { theme } from "@/src/global/theme";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";


export default function Home() {
  const [description, setDescription] = useState('');
  const [total, setTotal] = useState('');
  const [totalInstallments, setTotalInstallments] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<number | null>(null);
  const [category, setCategory] = useState<number | null>(null);
  const [date, setDate] = useState<Date>();

  const [openDatePicker, setOpenDatePicker] = useState(false);

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema: { categoriesSchema } });

  const { data: categories } = useLiveQuery(
    drizzleDb.select().from(categoriesSchema)
  );

  const { data: paymentMethods } = useLiveQuery(
    drizzleDb.select().from(paymentMethodsSchema)
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Despesas</Text>
        <Pressable style={styles.deleteWrapper} >
          <Text style={styles.deleteText}>Excluir</Text>
        </Pressable>
      </View>
      <Input
        value={description}
        setValue={setDescription}
        placeholder="Descrição"
        autoCapitalize="words"
      />
      <Input
        value={total}
        setValue={setTotal}
        placeholder="Valor total"
      />
      <Input
        value={totalInstallments}
        setValue={setTotalInstallments}
        placeholder="Total de parcelas"
      />
      <Text style={styles.label}>Selecione uma categoria</Text>
      <TagOptions
        options={categories}
        selectedOption={category}
        setSelectedOption={setCategory}
      />

      <Text style={styles.label}>Selecione um método de pagamento</Text>
      <TagOptions
        options={paymentMethods}
        selectedOption={paymentMethod}
        setSelectedOption={setPaymentMethod}
      />

      <FakeInput
        placeholder="Selecione uma data"
        value={date ? format(date, 'dd/MM/yyyy') : ''}
        onPress={() => setOpenDatePicker(true)}
      />

      <Button>
        Salvar
      </Button>

      {openDatePicker && (

        <DateTimePicker
          value={date || new Date()}
          onChange={(event, selectedDate) => {
            setOpenDatePicker(false);
            if (selectedDate) {
              console.log('dateeee', selectedDate)
              setDate(selectedDate)
            }
          }}
        />
      )}
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