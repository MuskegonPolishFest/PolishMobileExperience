import { Pressable, Text, StyleSheet} from "react-native";

export default function StartButton({ onPress }) {
    return (
      <Pressable onPress={onPress} 
      style={({ pressed }) => [
        styles.button,
        pressed && { transform: [{ scale: 0.98 }], opacity: 0.85 },
      ]}>
        <Text style={styles.text}>Start Journey</Text>
      </Pressable>
    );
  }

  const styles = StyleSheet.create({
    button: {
      backgroundColor: "#B01F1F",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 350,
      height: 60,



    },
    text: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
    },
  });