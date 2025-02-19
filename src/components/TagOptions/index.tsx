import { theme } from "@/src/global/theme";
import { PropsWithChildren } from "react";
import { Pressable, PressableProps, StyleSheet, Text, View } from "react-native";

type Option = {
  id: number;
  name: string;
}

type Props = {
  options: Option[];
  selectedOption: number | null;
  setSelectedOption: (option: number | null) => void;
}

export default function TagOptions({ options, selectedOption, setSelectedOption }: Props) {

  const handleSelect = (id: number) => {
    if (selectedOption === id) {
      return setSelectedOption(null)
    }
    setSelectedOption(id)
  }

  return (
    <View style={styles.container}>
      {options.map(option => (
        <Pressable
          key={option.id}
          style={[styles.optionContainer, { borderColor: option.id === selectedOption ? theme.colors.primary.main : 'white' }]}
          onPress={() => handleSelect(option.id)}
        >
          <Text
            style={[styles.text, { color: option.id === selectedOption ? theme.colors.primary.main : 'white' }]}
          >
            {option.name}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    borderWidth: 1,
  },
  text: {
    color: 'white',
    fontSize: 16,
  }
})