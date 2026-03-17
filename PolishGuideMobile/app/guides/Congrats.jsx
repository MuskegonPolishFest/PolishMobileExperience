import { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { typography } from "../../theme/typography";
import { colors } from "../../theme/colors";

export default function CongratsScreen() {
  const router = useRouter();
  const { guideName, guideRoute, color } = useLocalSearchParams();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

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
        tension: 80,
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
    <View
      style={{
        flex: 1,
        backgroundColor: color,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
      }}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          alignItems: "center",
        }}
      >
        <Text
          style={[
            typography.h1,
            {
              textAlign: "center",
              marginBottom: 12,
              color: colors.white,
            },
          ]}
        >
        Na Zdrowie! 
        </Text>

        <Text
          style={[
            typography.p,
            {
              textAlign: "center",
              maxWidth: 320,
              color: colors.white,
            },
          ]}
        >
          You got...
        </Text>
      </Animated.View>
    </View>
  );
}