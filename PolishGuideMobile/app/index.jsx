// app/quiz/index.jsx
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

const TYPES = {
  A: { personality: "Artistic", guide: "Culture Buff Guide to the Golden Era" },
  B: { personality: "Detective", guide: "Unsung Hero Guide to the Partitions Era" },
  C: { personality: "Engineer", guide: "Crafter Guide to Rebuilding and Rebirth of Poland" },
  D: { personality: "Adventurous", guide: "Adventure Guide to WWII" },
};

// Placeholder images (swap later with real assets or URLs)
const PLACEHOLDER_IMG = "https://via.placeholder.com/600x400.png?text=Image+Placeholder";

const QUESTIONS = [
  {
    id: "pierogi",
    image: PLACEHOLDER_IMG, // TODO: pierogi image
    prompt:
      "If you were offered a plate of pierogi, but weren’t told what the filling was, what would you be the most likely to do?",
    options: [
      {
        key: "A",
        title: "A",
        text: "Pick the best looking, most beautiful one and put it on your plate to eat later.",
      },
      {
        key: "B",
        title: "B",
        text: "Study them carefully to try to figure it out (smell, maybe touch one).",
      },
      {
        key: "C",
        title: "C",
        text: "Ask about the known ingredients to reason out what’s inside.",
      },
      { key: "D", title: "D", text: "Grab one and bite into it to find out." },
    ],
  },
  {
    id: "kielbasa",
    image: PLACEHOLDER_IMG, // TODO: kielbasa image
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
    image: PLACEHOLDER_IMG, // TODO: Chopin image
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
    image: PLACEHOLDER_IMG, // TODO: Polka image
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
    image: PLACEHOLDER_IMG, // optional placeholder
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
  safeArea: { flex: 1, backgroundColor: "#fff" },

  // Scrollable content area
  scrollView: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },

  // Results scroll area
  resultContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 48,
  },

  // Text + layout
  progressText: { fontSize: 14, opacity: 0.7 },
  prompt: { fontSize: 22, fontWeight: "700", marginTop: 12 },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    backgroundColor: "#ddd",
    marginTop: 16,
  },

  optionsWrapper: { marginTop: 16 },
  optionCard: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    marginBottom: 12,
  },
  optionCardSelected: { borderColor: "#111", backgroundColor: "#eee" },
  optionTitle: { fontWeight: "700" },
  optionText: { marginTop: 6 },

  // Footer pinned controls
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#e5e5e5",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  controlButton: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryControl: { flex: 1 },
  controlSpacer: { width: 12 },

  // Results UI
  resultTitle: { fontSize: 24, fontWeight: "700" },
  resultButtonsRow: { flexDirection: "row", marginTop: 20 },
  resultButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
  },
  resultButtonsSpacer: { width: 12 },
});

function computeResult(answers) {
  const counts = { A: 0, B: 0, C: 0, D: 0 };

  for (let i = 0; i < answers.length; i++) {
    const { questionId, choiceKey } = answers[i];
    const isFinal = questionId === "achiever";
    const weight = isFinal ? 2 : 1; // final question double weight
    counts[choiceKey] += weight;
  }

  // pick max; tie-breaker = earliest in A/B/C/D order (deterministic)
  const order = ["A", "B", "C", "D"];
  let best = "A";
  for (const k of order) {
    if (counts[k] > counts[best]) best = k;
  }

  return { letter: best, ...TYPES[best], counts };
}

export default function QuizScreen() {
  const router = useRouter();

  const total = QUESTIONS.length;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]); // [{ questionId, choiceKey }]
  const [finished, setFinished] = useState(false);

  const currentQ = QUESTIONS[step];

  const currentChoice = useMemo(() => {
    const found = answers.find((a) => a.questionId === currentQ.id);
    return found?.choiceKey ?? null;
  }, [answers, currentQ.id]);

  const progressText = `${step + 1} / ${total}`;

  function selectChoice(choiceKey) {
    setAnswers((prev) => {
      const without = prev.filter((a) => a.questionId !== currentQ.id);
      return [...without, { questionId: currentQ.id, choiceKey }];
    });
  }

  function goNext() {
    if (!currentChoice) return;
    if (step < total - 1) setStep((s) => s + 1);
    else setFinished(true);
  }

  function goBack() {
    if (step > 0) setStep((s) => s - 1);
    else router.back(); // exits /quiz if on first question
  }

  function restart() {
    setStep(0);
    setAnswers([]);
    setFinished(false);
  }

  if (finished) {
    const result = computeResult(answers);
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.resultContent}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
        >
          <Text style={styles.resultTitle}>Your Result</Text>

          <View style={{ height: 16 }} />

          <Text style={{ fontSize: 18 }}>
            Type: <Text style={{ fontWeight: "700" }}>{result.personality}</Text> ({result.letter})
          </Text>
          <View style={{ height: 8 }} />
          <Text style={{ fontSize: 16 }}>
            Guide: <Text style={{ fontWeight: "700" }}>{result.guide}</Text>
          </Text>

          <View style={{ height: 16 }} />
          <Text style={{ fontWeight: "700" }}>Score breakdown</Text>
          <Text>A: {result.counts.A}</Text>
          <Text>B: {result.counts.B}</Text>
          <Text>C: {result.counts.C}</Text>
          <Text>D: {result.counts.D}</Text>

          <View style={styles.resultButtonsRow}>
            <Pressable onPress={restart} style={styles.resultButton}>
              <Text>Restart</Text>
            </Pressable>
            <View style={styles.resultButtonsSpacer} />
            <Pressable onPress={() => router.back()} style={styles.resultButton}>
              <Text>Exit</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Scrollable content (options etc.) */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.progressText}>Progress: {progressText}</Text>

        <Text style={styles.prompt}>{currentQ.prompt}</Text>

        <Image source={{ uri: currentQ.image }} style={styles.image} resizeMode="cover" />

        <View style={styles.optionsWrapper}>
          {currentQ.options.map((opt) => {
            const selected = currentChoice === opt.key;
            return (
              <Pressable
                key={opt.key}
                onPress={() => selectChoice(opt.key)}
                style={[styles.optionCard, selected && styles.optionCardSelected]}
              >
                <Text style={styles.optionTitle}>{opt.title}</Text>
                <Text style={styles.optionText}>{opt.text}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Pinned footer controls (always visible) */}
      <View style={styles.footer}>
        <Pressable onPress={goBack} style={styles.controlButton}>
          <Text>Back</Text>
        </Pressable>

        <View style={styles.controlSpacer} />

        <Pressable
          onPress={goNext}
          disabled={!currentChoice}
          style={[
            styles.controlButton,
            styles.primaryControl,
            !currentChoice && { opacity: 0.4 },
          ]}
        >
          <Text style={{ fontWeight: "700" }}>
            {step === total - 1 ? "Finish" : "Next"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
