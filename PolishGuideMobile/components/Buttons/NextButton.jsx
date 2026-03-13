import { Pressable, Text, StyleSheet} from "react-native";

export default function NextButton({ onPress, disabled, isLast}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && { transform: [{ scale: 0.98 }], opacity: 0.85 },
      ]}
    >
      <Text style={styles.text}>
        {isLast ? "Finish" : "Next"}
      </Text>
    </Pressable>
  );
}

  const styles = StyleSheet.create({
    button: {
      flex: 1,
      backgroundColor: "#B01F1F",
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      height: 60,
    },
    text: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
    },

    disabled: {
      opacity: 0.5,
    }
  });