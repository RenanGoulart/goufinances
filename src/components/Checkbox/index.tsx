import { FontAwesome } from "@expo/vector-icons";
import { Pressable, StyleSheet, ViewStyle } from "react-native";

type Props = {
  isChecked: boolean;
  onPress?: VoidFunction;
  style?: ViewStyle;
}

export default function Checkbox({ isChecked, onPress, style }: Props) {
  return (
    <Pressable
      style={[styles.container, ...(isChecked ? [{ backgroundColor: '#fff' }] : []), style]}
      onPress={onPress}
    >
      {isChecked && (
        <FontAwesome name="check" size={16} color="black" />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#fff',
  }
})