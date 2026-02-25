/**
 * StepIndicator.tsx
 *
 * A simple 1–2–3 progress indicator for React Native.
 *
 * USAGE:
 *   <StepIndicator step={1} /> // highlights step 1
 *   <StepIndicator step={2} /> // highlights steps 1–2
 *   <StepIndicator step={3} /> // highlights steps 1–3
 *
 * NOTES:
 * - This is intentionally lightweight (no external dependencies).
 * - Styling can be adjusted in the StyleSheet below.
 * - Designed for horizontal use in onboarding / multi-step flows.
 */


import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StepIndicator({ step = 1 }) {
  return (
<View style={styles.wrapper}>
<View style={styles.line} />
<View style={styles.container}>
  {[1, 2, 3].map((num) => {
    const isActive = step === num;

    return (
      <View
        key={num}
        style={[styles.circle, isActive && styles.activeCircle]}
      >
        {isActive && <Text style={styles.text}>{num}</Text>}
      </View>
    );
  })}
</View>
</View>
  );
}

const styles = StyleSheet.create({
    wrapper: {
        width: 280,
        alignSelf: "center",
        position: "relative",
      },
      line: {
        position: "absolute",
        top: 20, // vertically centers behind circles
        left: 16,
        right: 16,
        borderTopWidth: 1,
        opacity: 0.8,
        borderColor: "#D9D9D9",
        borderStyle: "dashed",

        
      },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280,
    alignSelf: "center",
    alignItems: "center",

  },
  circle: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#D8D8D8",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
  },
  activeCircle: {
    opacity: 1,
    width: 40,
    height: 40,
    borderWidth: 0,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B01F1F",
  },
  text: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 20,
  },
  activeText: {
    color: "#fff",
  },
});