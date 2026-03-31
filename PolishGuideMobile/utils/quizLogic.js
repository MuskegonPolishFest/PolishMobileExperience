const TYPES = {
  A: { personality: "Artistic", guide: "Culture Buff Guide to the Golden Era" },
  B: { personality: "Detective", guide: "Unsung Hero Guide to the Partitions Era" },
  C: { personality: "Engineer", guide: "Crafter Guide to Rebuilding and Rebirth of Poland" },
  D: { personality: "Adventurous", guide: "Adventure Guide to WWII" },
};

const IMAGES = {
  pierogi: require("../assets/images/QuizPictures/Pierogi.png"),
  kielbasa: require("../assets/images/QuizPictures/Kielbasa.png"),
  chopin: require("../assets/images/QuizPictures/Chopin.png"),
  polka: require("../assets/images/QuizPictures/Polka.png"),
  achiever: require("../assets/images/QuizPictures/Flag.png"),
};

export const QUESTIONS = [
  {
    id: "pierogi",
    image: IMAGES.pierogi,
    prompt:
      "If you were offered a plate of pierogi, but weren’t told what the filling was, what would you be most likely to do?",
    options: [
      { key: "A", text: "Pick the best-looking one and put it on your plate to eat later." },
      { key: "B", text: "Study them carefully to try to figure it out." },
      { key: "C", text: "Ask about the ingredients to reason out what’s inside." },
      { key: "D", text: "Grab one and bite into it to find out." },
    ],
  },
  {
    id: "kielbasa",
    image: IMAGES.kielbasa,
    prompt:
      "A child drops their kielbasa in the dirt and starts crying. What would you be most likely to do?",
    options: [
      {
        key: "A",
        text: "Comfort the child by giving them a flower piece or Polish button you just bought.",
      },
      { key: "B", text: "Find the child’s parents." },
      {
        key: "C",
        text: "Get the child another kielbasa, but ask for a takeaway box so it will not drop again.",
      },
      {
        key: "D",
        text: "Give them your untouched kielbasa and act like it is no big deal.",
      },
    ],
  },
  {
    id: "chopin",
    image: IMAGES.chopin,
    prompt:
      "If you were in the culture tent and Chopin was playing in the background, what would you be most likely to think or do?",
    options: [
      {
        key: "A",
        text: "Make a mental note to find a Chopin performance in West Michigan soon.",
      },
      { key: "B", text: "Ask the tent guide if Chopin was Polish." },
      { key: "C", text: "Check out the speakers." },
      { key: "D", text: "Ask if they can play some rock instead." },
    ],
  },
  {
    id: "polka",
    image: IMAGES.polka,
    prompt:
      'If a festival volunteer asked you to help demonstrate a polka called "The Chicago Hop," what would you be most likely to do?',
    options: [
      {
        key: "A",
        text: "Join in if you dance, or politely decline and mention a dance event you know about.",
      },
      {
        key: "B",
        text: "Join in if you dance, or decline and start wondering what made them ask you.",
      },
      {
        key: "C",
        text: "Ask them to explain exactly what the Chicago Hop is before deciding.",
      },
      {
        key: "D",
        text: "Jump in and give it a try either way.",
      },
    ],
  },
  {
    id: "achiever",
    image: IMAGES.achiever,
    prompt: "Which Polish achiever do you find most interesting?",
    options: [
      {
        key: "A",
        text: "Vaslav Nijinsky — a groundbreaking dancer who changed modern dance.",
      },
      {
        key: "B",
        text: "Madame Curie — a two-time Nobel Prize winner born in Warsaw.",
      },
      {
        key: "C",
        text: "Copernicus — helped start the scientific revolution through math and astronomy.",
      },
      {
        key: "D",
        text: "Witold Pilecki — a resistance fighter and WWII hero.",
      },
    ],
  },
];

export function computeResult(answers) {
  const counts = { A: 0, B: 0, C: 0, D: 0 };

  for (let i = 0; i < answers.length; i++) {
    const { questionId, choiceKey } = answers[i];
    const isFinal = questionId === "achiever";
    const weight = isFinal ? 2 : 1;
    counts[choiceKey] += weight;
  }

  const maxScore = Math.max(counts.A, counts.B, counts.C, counts.D);
  const tiedLetters = Object.keys(counts).filter(
    (letter) => counts[letter] === maxScore
  );

  if (tiedLetters.length === 1) {
    const winner = tiedLetters[0];
    return { letter: winner, ...TYPES[winner], counts };
  }

  const finalAnswer = answers.find((a) => a.questionId === "achiever")?.choiceKey;

  if (finalAnswer && tiedLetters.includes(finalAnswer)) {
    return { letter: finalAnswer, ...TYPES[finalAnswer], counts };
  }

  const fallbackOrder = ["A", "B", "C", "D"];
  const fallbackWinner = fallbackOrder.find((letter) =>
    tiedLetters.includes(letter)
  );

  return { letter: fallbackWinner, ...TYPES[fallbackWinner], counts };
}