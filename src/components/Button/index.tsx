import { theme } from "@/src/global/theme";
import { PropsWithChildren } from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

type Props = PressableProps & {}

export default function Button({ children, ...props }: PropsWithChildren<Props>) {
  return (
    <Pressable style={styles.container} {...props}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: theme.colors.primary.main,
  },
  text: {
    color: 'white',
    fontSize: 16,
  }
})