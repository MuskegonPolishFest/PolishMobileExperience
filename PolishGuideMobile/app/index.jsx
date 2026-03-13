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

// If these exports are default vs named in your project, adjust accordingly
import StepIndicator from "../components/StepIndicator";

// Optional: if you want to use their button components later
// import BackButton from "../components/Buttons/BackButton";
// import NextButton from "../components/Buttons/NextButton";

const TYPES = {
  A: { personality: "Artistic", guide: "Culture Buff Guide to the Golden Era" },
  B: { personality: "Detective", guide: "Unsung Hero Guide to the Partitions Era" },
  C: { personality: "Engineer", guide: "Crafter Guide to Rebuilding and Rebirth of Poland" },
  D: { personality: "Adventurous", guide: "Adventure Guide to WWII" },
};

const GUIDE_ROUTE_BY_LETTER = {
  A: "/guides/EducatorGuide",
  B: "/guides/WriterGuide",
  C: "/guides/CrafterGuide",
  D: "/guides/ExplorerGuide",
};

// Prefer local assets over URL placeholders so it looks like Figma.
// These paths match what you merged: PolishGuideMobile/assets/images/QuizPictures/*
const IMAGES = {
  pierogi: require("../assets/images/QuizPictures/Pierogi.png"),
  kielbasa: require("../assets/images/QuizPictures/Kielbasa.png"),
  chopin: require("../assets/images/QuizPictures/Chopin.png"),
  polka: require("../assets/images/QuizPictures/Polka.png"),
  achiever: require("../assets/images/QuizPictures/Flag.png"),
};

const QUESTIONS = [
  {
    id: "pierogi",
    image: IMAGES.pierogi,
    prompt:
      "If you were offered a plate of pierogi, but weren’t told what the filling was, what would you be the most likely to do?",
    options: [
      { key: "A", title: "A", text: "Pick the best looking, most beautiful one and put it on your plate to eat later." },
      { key: "B", title: "B", text: "Study them carefully to try to figure it out (smell, maybe touch one)." },
      { key: "C", title: "C", text: "Ask about the known ingredients to reason out what’s inside." },
      { key: "D", title: "D", text: "Grab one and bite into it to find out." },
    ],
  },
    {
    id: "kielbasa",
    image: IMAGES.kielbasa,
    prompt:
      "If you saw a child drop a kielbasa off their plate into the dirt and then cry at the festival today, what would you like the most to do about it?",
    options: [
      {
        key: "A",
        title: "A",
        text: "Comfort the child by putting a hair flowerpiece or Polish button you just bought on them.",
      },
      { key: "B", title: "B", text: "Find the child’s parents." },
      {
        key: "C",
        title: "C",
        text: "Get the child another kielbasa, but ask for a takeaway box so it won’t drop off again.",
      },
      {
        key: "D",
        title: "D",
        text: "Give them your untouched kielbasa, grab the dirty one, wipe it off, bite into it and say “no harm done.”",
      },
    ],
  },
  {
    id: "chopin",
    image: IMAGES.chopin,
    prompt:
      "If you are enjoying the culture tent at the festival and Chopin classical music is playing in the background, what would you be most likely to think or do?",
    options: [
      {
        key: "A",
        title: "A",
        text: "Make a mental note to try and find a performance of Chopin in West Michigan soon.",
      },
      { key: "B", title: "B", text: "Ask the tent guide if Chopin was Polish." },
      { key: "C", title: "C", text: "Check out the speakers." },
      {
        key: "D",
        title: "D",
        text: "Ask the tent guide if they can play some rock instead.",
      },
    ],
  },
  {
    id: "polka",
    image: IMAGES.polka,
    prompt:
      'If a very attractive festival volunteer in Polish costume asked you to help demonstrate a type of polka called "The Chicago Hop" on the dance floor (and in this quiz universe, you are single), which would you be most likely to do?',
    options: [
      {
        key: "A",
        title: "A",
        text: "If you’re a dancer: grab costume merch, put it on and dance. If not: decline, but mention a dance concert in West Michigan you had tickets for.",
      },
      {
        key: "B",
        title: "B",
        text: "If you’re a dancer: dance and question them closely for clues they might find you attractive. If not: decline, then ask everyone you know if they know the person.",
      },
      {
        key: "C",
        title: "C",
        text: "If you’re a dancer: ask them to explain what the Chicago Hop is in detail. If not: ask anyway.",
      },
      {
        key: "D",
        title: "D",
        text: "If you’re a dancer: grab them and get on the floor. If not: grab them and get on the floor anyway.",
      },
    ],
  },
  {
    id: "achiever",
    image: IMAGES.achiever,
    prompt: "Which Polish achiever do you find the most interesting?",
    // NOTE: this final question is double-weight (handled below)
    options: [
      {
        key: "A",
        title: "A",
        text: "Vaslav Nijinsky — greatest male dancer of the early 20th century, changed the course of modern dance.",
      },
      {
        key: "B",
        title: "B",
        text: "2-time Nobel Prize winner Madame Curie — born Maria Skłodowska in Warsaw; schooled in a secret underground educational network.",
      },
      {
        key: "C",
        title: "C",
        text: "Copernicus — started the scientific revolution with the theory of Earth orbiting the sun… using math, no telescope.",
      },
      {
        key: "D",
        title: "D",
        text: "Witold Pilecki — super spy; ran a resistance in Auschwitz, smuggled out early proof of the Holocaust; escaped and survived being shot.",
      },
    ],
  },

];

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollView: { flex: 1 },

  scrollContent: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 20, // matches Figma paddingLeft/Right: 20
  },

  headerBlock: {
    alignItems: "center",
  },

  questionText: {
    ...typography.h2,
    textAlign: "center",
    marginTop: 20,
  },

  imageCard: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    backgroundColor: colors.white,
    marginTop: 20,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  optionsWrapper: {
    marginTop: 20,
    gap: 12,
  },

  optionCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.white, // default looks “flat” like Figma
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  optionCardSelected: {
    borderColor: colors.primary,
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  optionLetterPill: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: colors.grey,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },

  optionLetterPillSelected: {
    backgroundColor: colors.primary,
  },

  optionLetter: {
    fontSize: 14,
    fontFamily: "Inter-Bold",
    color: colors.text,
  },

  optionLetterSelected: {
    color: colors.white,
  },

  optionTextBlock: { flex: 1 },

  optionTitle: {
    ...typography.pBold,
    marginBottom: 6,
  },

  optionBody: {
    ...typography.p,
    opacity: 0.9,
  },

  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.background,
  },

  backButton: {
    width: 79,
    height: 68,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },

  backButtonText: {
    fontSize: 20,
    fontFamily: "Inter-Black",
    color: colors.primary,
  },

  nextButton: {
    flex: 1,
    height: 68,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },

  nextButtonDisabled: {
    backgroundColor: colors.disabledRed,
  },

  nextButtonText: {
    fontSize: 20,
    fontFamily: "Inter-Black",
    color: colors.white,
  },
});

function computeResult(answers) {
  const counts = { A: 0, B: 0, C: 0, D: 0 };

  for (let i = 0; i < answers.length; i++) {
    const { questionId, choiceKey } = answers[i];
    const isFinal = questionId === "achiever";
    const weight = isFinal ? 2 : 1;
    counts[choiceKey] += weight;
  }

  const order = ["A", "B", "C", "D"];
  let best = "A";
  for (const k of order) if (counts[k] > counts[best]) best = k;

  return { letter: best, ...TYPES[best], counts };
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

    // finishing — ensure the final answer is included
    const finalAnswers = [
      ...answers.filter((a) => a.questionId !== currentQ.id),
      { questionId: currentQ.id, choiceKey: currentChoice },
    ];

    const result = computeResult(finalAnswers);
    const route = GUIDE_ROUTE_BY_LETTER[result.letter] ?? "/guides/EducatorGuide";
    router.push(route);
  }

  function goBack() {
    if (step > 0) setStep((s) => s - 1);
    else router.back();
  }


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerBlock}>
          {/* Stepper to match Figma */}
          <StepIndicator step={step} total={total} />

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
                style={[styles.optionCard, selected && styles.optionCardSelected]}
              >
                <View style={styles.optionRow}>
                  <View
                    style={[
                      styles.optionLetterPill,
                      selected && styles.optionLetterPillSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionLetter,
                        selected && styles.optionLetterSelected,
                      ]}
                    >
                      {opt.title}
                    </Text>
                  </View>

                  <View style={styles.optionTextBlock}>
                    <Text style={styles.optionTitle}>Option {opt.title}</Text>
                    <Text style={styles.optionBody}>{opt.text}</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable onPress={goBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹</Text>
        </Pressable>

        <Pressable
          onPress={goNext}
          disabled={!currentChoice}
          style={[
            styles.nextButton,
            !currentChoice && styles.nextButtonDisabled,
          ]}
        >
          <Text style={styles.nextButtonText}>
            {step === total - 1 ? "Finish" : "Next"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}