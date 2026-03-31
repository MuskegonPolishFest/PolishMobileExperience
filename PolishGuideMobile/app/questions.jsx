import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import BackButton from "../components/Buttons/BackButton";
import NextButton from "../components/Buttons/NextButton";
import { QUESTIONS, computeResult } from "../utils/quizLogic";

const GUIDE_ROUTE_BY_LETTER = {
  A: {
    guideName: "The Educator",
    guideRoute: "/guides/EducatorGuide",
    color: "#9B5802",
  },
  B: {
    guideName: "The Writer",
    guideRoute: "/guides/WriterGuide",
    color: "#4E6CD8",
  },
  C: {
    guideName: "The Crafter",
    guideRoute: "/guides/CrafterGuide",
    color: "#2F702F",
  },
  D: {
    guideName: "The Explorer",
    guideRoute: "/guides/ExplorerGuide",
    color: "#D83F19",
  },
};

function QuizStepper({ currentStep, totalSteps }) {
  return (
    <View style={styles.stepperBlock}>

      <View style={styles.stepperRow}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <React.Fragment key={index}>
              <View
                style={[
                  styles.stepCircle,
                  (isActive || isCompleted) && styles.stepCircleActive,
                ]}
              >
                <Text
                  style={[
                    styles.stepCircleText,
                    (isActive || isCompleted) && styles.stepCircleTextActive,
                  ]}
                >
                  {index + 1}
                </Text>
              </View>

              {index < totalSteps - 1 && (
                <View
                  style={[
                    styles.stepLine,
                    index < currentStep && styles.stepLineActive,
                  ]}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}

export default function QuizScreen() {
  const router = useRouter();

  const total = QUESTIONS.length;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const currentQ = QUESTIONS[step];

  const currentChoice = useMemo(() => {
    const found = answers.find((a) => a.questionId === currentQ.id);
    return found?.choiceKey ?? null;
  }, [answers, currentQ.id]);

  function selectChoice(choiceKey) {
    setAnswers((prev) => {
      const without = prev.filter((a) => a.questionId !== currentQ.id);
      return [...without, { questionId: currentQ.id, choiceKey }];
    });
  }

  function goNext() {
    if (!currentChoice) return;

    if (step < total - 1) {
      setStep((s) => s + 1);
      return;
    }

    const finalAnswers = [
      ...answers.filter((a) => a.questionId !== currentQ.id),
      { questionId: currentQ.id, choiceKey: currentChoice },
    ];

    const result = computeResult(finalAnswers);
    const route = GUIDE_ROUTE_BY_LETTER[result.letter] ?? "/guides/EducatorGuide";
    router.push(
      {
      pathname: "/guides/Congrats",
      params: {
        guideName: route.guideName,
        guideRoute: route.guideRoute,
        color: route.color,
      },
      }
    );
  }

  function goBack() {
    if (step > 0) {
      setStep((s) => s - 1);
    } else {
      router.back();
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.screen}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerBlock}>
            <QuizStepper currentStep={step} totalSteps={total} />
            <Text style={styles.questionText}>{currentQ.prompt}</Text>
          </View>

          <View style={styles.imageCard}>
            <Image source={currentQ.image} style={styles.image} resizeMode="cover" />
          </View>

          <View style={styles.optionsWrapper}>
            {currentQ.options.map((opt) => {
              const selected = currentChoice === opt.key;

              return (
                <Pressable
                  key={opt.key}
                  onPress={() => selectChoice(opt.key)}
                  style={[
                    styles.optionCard,
                    selected && styles.optionCardSelected,
                  ]}
                >
                  <View style={styles.optionRow}>
                    <View
                      style={[
                        styles.optionBullet,
                        selected && styles.optionBulletSelected,
                      ]}
                    >
                      {selected && <View style={styles.optionBulletInner} />}
                    </View>

                    <View style={styles.optionTextBlock}>
                      <Text style={styles.optionBody}>{opt.text}</Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <BackButton onPress={goBack} />

          <NextButton
            onPress={goNext}
            disabled={!currentChoice}
            isLast={step === total - 1}
          />
        </View>
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
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },

  headerBlock: {
    alignItems: "center",
  },

  stepperBlock: {
    width: "100%",
    marginBottom: 16,
  },

  stepCountText: {
    ...typography.p,
    textAlign: "center",
    marginBottom: 12,
    opacity: 0.75,
  },

  stepperRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 999,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
  },

  stepCircleActive: {
    backgroundColor: colors.primary,
  },

  stepCircleText: {
    fontSize: 14,
    fontFamily: "Inter-Bold",
    color: "#6B6B6B",
  },

  stepCircleTextActive: {
    color: colors.white,
  },

  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 6,
    maxWidth: 36,
  },

  stepLineActive: {
    backgroundColor: colors.primary,
  },

  questionText: {
    ...typography.h2,
    textAlign: "center",
    marginTop: 4,
  },

  imageCard: {
    width: "100%",
    height: 220,
    borderRadius: 18,
    backgroundColor: colors.white,
    marginTop: 16,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  optionsWrapper: {
    marginTop: 16,
    gap: 10,
  },

  optionCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#E6E6E6",
    paddingHorizontal: 14,
    paddingVertical: 14,
  },

  optionCardSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: "#FFF8F8",
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  optionBullet: {
    width: 22,
    height: 22,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#C8C8C8",
    backgroundColor: colors.white,
    marginTop: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  optionBulletSelected: {
    borderColor: colors.primary,
  },

  optionBulletInner: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },

  optionTextBlock: {
    flex: 1,
  },

  optionBody: {
    ...typography.p,
    opacity: 0.95,
  },

  footer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.background,
  },

});