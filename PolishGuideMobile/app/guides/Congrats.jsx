import { useEffect, useRef } from "react";
import { View, Text, Animated, Easing, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { typography } from "../../theme/typography";

export default function CongratsScreen() {
  const router = useRouter();
  const { guideName, guideRoute, color } = useLocalSearchParams();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 70,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      if (guideRoute) {
        router.replace(guideRoute);
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, guideRoute, router]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: color || "#FFFFFF" }]}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Na Zdrowie!</Text>
          <Text style={styles.subtitle}>
            You got...
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  content: {
    alignItems: "center",
  },

  title: {
    ...typography.h1,
    textAlign: "center",
    color: "#ffffff",
    marginBottom: 12,
  },

  subtitle: {
    ...typography.p,
    textAlign: "center",
    color: "#ffffff",
    maxWidth: 320,
  },

  boldText: {
    fontWeight: "700",
  },
});