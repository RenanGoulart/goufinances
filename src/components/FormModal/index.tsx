import { theme } from '@/src/global/theme';
import { useCategory } from '@/src/services/category';
import { usePaymentMethod } from '@/src/services/paymentMethod';
import { useSpent } from '@/src/services/spent';
import { SpentForm, SpentFormSchema } from '@/src/validations/spents.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactNativeModal from 'react-native-modal';
import Input from '../Input';
import TagOptions from '../TagOptions';
import FakeInput from '../FakeInput';
import { format } from 'date-fns';
import Button from '../Button';

type ModalProps = {
  closeModal: VoidFunction;
}

type Props = {
  isVisible: boolean;
  closeModal: VoidFunction;
  type: 'spent' | 'category' | 'paymentMethod';
}

export default function FormModal({ isVisible, closeModal, type }: Props) {
  if (!isVisible) return null;

  if (type === 'spent') {
    return (
      <SpentModal closeModal={closeModal} />
    )
  }
  return null;
}

function SpentModal({ closeModal }: ModalProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const { handleCreate } = useSpent();
  const { data: categories } = useCategory();
  const { data: paymentMethods } = usePaymentMethod();

  const { control, handleSubmit, getValues, setValue } = useForm<SpentForm>({
    resolver: zodResolver(SpentFormSchema),
  });

  const onSubmit = async (data: SpentForm) => {
    console.log(JSON.stringify(data, null, 2))
    await handleCreate(data);
    closeModal();
  }

  return (
    <ReactNativeModal isVisible={true} onBackdropPress={closeModal}>
      <View style={styles.container}>
        <Text style={styles.title}>Adicionar despesa</Text>
        <Input
          control={control}
          name="description"
          placeholder="Descrição"
          autoCapitalize="words"
        />
        <Input
          control={control}
          name="total_value"
          placeholder="Valor total"
          maskType="money"
        />
        <Input
          control={control}
          name="total_installments"
          placeholder="Total de parcelas"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Selecione uma categoria</Text>
        <TagOptions
          control={control}
          name="category_id"
          options={categories}
        />

        <Text style={styles.label}>Selecione um método de pagamento</Text>
        <TagOptions
          control={control}
          name="payment_method_id"
          options={paymentMethods}
        />

        <FakeInput
          placeholder="Selecione uma data"
          value={getValues('date') ? format(getValues('date'), 'dd/MM/yyyy') : ''}
          onPress={() => setOpenDatePicker(true)}
        />

        <Button onPress={handleSubmit(onSubmit)} >
          Salvar
        </Button>
      </View>
      {openDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          onChange={(_, selectedDate) => {
            setOpenDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
              setValue('date', selectedDate.toISOString());
            }
          }}
        />
      )}
    </ReactNativeModal>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#222',
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