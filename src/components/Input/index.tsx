import { StyleSheet, TextInput, TextInputProps } from "react-native";

type Props = TextInputProps & {
  value: string;
  setValue: (value: string) => void;
};

export default function Input({ value, setValue, ...props }: Props) {
  return (
    <TextInput
      value={value}
      onChangeText={setValue}
      placeholderTextColor={'#aaa'}
      style={styles.input}
      {...props}
    />
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
})