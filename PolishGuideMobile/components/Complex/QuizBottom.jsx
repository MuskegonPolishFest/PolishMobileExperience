import { Text, View, Image } from "react-native";
import NextButton from "../Buttons/NextButton.jsx";
import BackButton from "../Buttons/BackButton.jsx";

export default function QuizBottom() {
    return (
      <View style={{ marginTop: 20, display: "flex", flexDirection: "row", gap: 12,  }}>
      <BackButton onPress={() => console.log("Start button pressed")} />
      <NextButton onPress={() => console.log("Start button pressed")} />
      </View>
    );
  }