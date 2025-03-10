import { theme } from "@/src/global/theme";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Option = {
  id: number;
  name: string;
}

type Props<TFieldValues extends FieldValues> = {
  options: Option[];
} & UseControllerProps<TFieldValues>

export default function TagOptions<TFieldValues extends FieldValues>({
  name,
  control,
  options
}: Props<TFieldValues>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control
  })

  const handleSelect = (id: number) => {
    if (value === id) {
      return onChange(null)
    }
    onChange(id)
  }

  return (
    <View style={styles.container}>
      {options.map(option => (
        <Pressable
          key={option.id}
          style={[styles.optionContainer, { borderColor: option.id === value ? theme.colors.primary.main : 'white' }]}
          onPress={() => handleSelect(option.id)}
        >
          <Text
            style={[styles.text, { color: option.id === value ? theme.colors.primary.main : 'white' }]}
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