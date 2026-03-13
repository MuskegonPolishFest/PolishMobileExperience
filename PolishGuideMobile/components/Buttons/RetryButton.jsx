import { Pressable, Text, StyleSheet} from "react-native";
import { useRouter } from "expo-router";

export default function RetryButton({ onPress }) {
    const router = useRouter();

    function handlePress() {
      if (onPress) {
        onPress();
        return;
      }

      router.replace("/questions");
    }

    return (
      <Pressable 
      onPress={handlePress} 
      style={({ pressed }) => [
        styles.button,
        pressed && { transform: [{ scale: 0.98 }], opacity: 0.85 },
      ]}>
        <Text style={styles.text}>Retry Quiz</Text>
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
      width: 280,
      height: 60,
      marginTop: 60,



    },
    text: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
    },
  });