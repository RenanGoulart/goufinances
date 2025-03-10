import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { TextInputMask, TextInputMaskOptionProp, TextInputMaskTypeProp } from 'react-native-masked-text';
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { theme } from "@/src/global/theme";

type Props<TFieldValues extends FieldValues> = {
  maskType?: TextInputMaskTypeProp;
  maskOptions?: TextInputMaskOptionProp;
} & TextInputProps & UseControllerProps<TFieldValues>;

export default function Input<TFieldValues extends FieldValues>({
  name,
  control,
  maskType,
  maskOptions,
  ...props
}: Props<TFieldValues>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <View>
      {maskType ? (
        <TextInputMask
          type={maskType}
          options={maskOptions}
          value={value}
          onChangeText={onChange}
          placeholderTextColor={'#aaa'}
          style={styles.input}
          {...props}
        />
      ) : (
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholderTextColor={'#aaa'}
          style={styles.input}
          {...props}
        />
      )}
      <Text style={styles.errorText}>{error && error.message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fff',
    color: '#fff',
  },
  errorText: {
    marginTop: 4,
    fontSize: 10,
    color: theme.colors.error.main,
  }
})