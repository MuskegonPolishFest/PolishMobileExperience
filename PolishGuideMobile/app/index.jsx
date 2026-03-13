import React from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { colors } from "../theme/colors";
import { typography } from "../theme/typography";

export default function QuizIntroScreen() {
  const router = useRouter();

  function startQuiz() {
    router.push("/questions");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.topContent}>
          <Text style={styles.title}>Meet our Polish{"\n"}History Guides!</Text>

          <View style={styles.illustrationWrap}>
            <Image
              source={require("../assets/images/WriterMobile.png")}
              style={styles.illustration}
              resizeMode="cover"
            />
          </View>

          <Text style={styles.subtitle}>
            Discover which Polish historical period to explore based on your
            favorite Polish traditions.
          </Text>
        </View>

        <Pressable onPress={startQuiz} style={styles.startButton}>
          <Text style={styles.startButtonText}>Start Journey</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 24,
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },

  topContent: {
    width: "100%",
    alignItems: "center",
    marginTop: 24,
  },

  title: {
    ...typography.h1,
    textAlign: "center",
    color: colors.text,
    maxWidth: 360,
  },

  illustrationWrap: {
    width: 270,
    height: 270,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.white,
    marginTop: 52,
    marginBottom: 20,
  },

  illustration: {
    width: "100%",
    height: "100%",
  },

  subtitle: {
    ...typography.p,
    textAlign: "center",
    color: colors.text,
    maxWidth: 320,
  },

  startButton: {
    alignSelf: "stretch",
    height: 68,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  startButtonText: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: colors.white,
  },
});