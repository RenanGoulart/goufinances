import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  value?: string;
  placeholder?: string;
  onPress?: VoidFunction;
};

export default function FakeInput({ value, placeholder, onPress }: Props) {
  return (
    <Pressable style={styles.input} onPress={onPress}>
      <Text style={[styles.text, { color: value ? 'white' : '#aaa' }]}>{value || placeholder}</Text>
    </Pressable>
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
  text: {
    color: 'white',
    fontSize: 14,
  }
})