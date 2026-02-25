import { Pressable, Text, StyleSheet} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BackButton({ onPress }) {
    return (
      <Pressable 
      onPress={onPress} 
      style={({ pressed }) => [
        styles.button,
        pressed && { transform: [{ scale: 0.98 }], opacity: 0.85, backgroundColor: "#B01F1F" },
      ]}>
        {({ pressed }) => (
    <Ionicons
      name="chevron-back-outline"
      size={24}
      color={pressed ? "#fff" : "#B01F1F"}
    />
  )}
      </Pressable>
    );
  }

  const styles = StyleSheet.create({
    button: {
      borderWidth: 2,
      borderColor: "#B01F1F",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 60,
      height: 60,



    },
    text: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
    },
  });