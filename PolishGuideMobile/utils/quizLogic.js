const TYPES = {
  A: { personality: "Culture Buff", guide: "Golden Age" },
  B: { personality: "Unsung Hero", guide: "Era of Wars and Partitions" },
  C: { personality: "Crafter", guide: "Rebirth of Poland" },
  D: { personality: "Adventurer", guide: "World War II and Occupation" },
};

const IMAGES = {
  job: require("../assets/images/QuizPictures/OgrodzieniecCastle.jpg"),
  vacation: require("../assets/images/QuizPictures/BialowiezaForest.jpg"),
  pierogiShare: require("../assets/images/QuizPictures/PierogiShare.jpg"),
  polka: require("../assets/images/QuizPictures/PolishPolka.jpg"),
  legend: require("../assets/images/QuizPictures/WawalDragon.jpg"),
};

export const QUESTIONS = [
  {
    id: "job",
    image: IMAGES.job,
    prompt:
      "By some miracle, you have time traveled to medieval Poland. You're in need of money, so you try to find a job. Which job are you taking?",
    options: [
      { key: "A", text: "I take a stall in the bazaar to sell traditional clothing." },
      { key: "B", text: "I become a scribe and record the history of the time." },
      { key: "C", text: "I emerge as a politician striving to bring progress to the realm." },
      { key: "D", text: "I join the knighthood to slay the enemies of my kingdom." },
    ],
  },
  {
    id: "vacation",
    image: IMAGES.vacation,
    prompt:
      "You're in need of a vacation, so you decide to plan a trip with your best friends. Where are you heading?",
    options: [
      { key: "A", text: "You head to Pomeranian Bay for a boating day." },
      {
        key: "B",
        text: "You decide to try out a new local restaurant and treat your friends to dinner.",
      },
      { key: "C", text: "You plan a camping trip to Bialowieza National Park." },
      { key: "D", text: "You head to Mount Rysy and attempt a climb to the top." },
    ],
  },
  {
    id: "pierogi-share",
    image: IMAGES.pierogiShare,
    prompt:
      "You are lucky enough to snatch the last pierogi, but on your way out, you hear a child complaining that they weren't able to get one. What do you do?",
    options: [
      { key: "A", text: "You walk away and enjoy your pierogi." },
      { key: "B", text: "You ask the child if they would like to share with you." },
      { key: "C", text: "You split the pierogi in half and offer one half to the child." },
      { key: "D", text: "You give the child the pierogi and try something new instead." },
    ],
  },
  {
    id: "polka-volunteer",
    image: IMAGES.polka,
    prompt:
      "It's time for the polka and the festival volunteers are requesting help for their demonstration. What do you do?",
    options: [
      { key: "A", text: "Volunteer yourself because you already know the dance." },
      { key: "B", text: "You decide to watch the dance first and join once you think you know it." },
      { key: "C", text: "You sit quietly and wait to see if they call on you or not." },
      { key: "D", text: "Volunteer yourself so you can learn it for the first time." },
    ],
  },
  {
    id: "legend",
    image: IMAGES.legend,
    prompt: "Which of these Polish legends sounds most interesting to you?",
    options: [
      { key: "A", text: "The Dragon of Wawel Hill" },
      { key: "B", text: "The Inspiration of the White Eagle" },
      { key: "C", text: "The Mermaid of the Vistula River" },
      { key: "D", text: "The Bear Who Was a Soldier" },
    ],
  },
];

export function computeResult(answers) {
  const counts = { A: 0, B: 0, C: 0, D: 0 };

  for (let i = 0; i < answers.length; i++) {
    const { questionId, choiceKey } = answers[i];
    const isFinal = questionId === "legend";
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

  const finalAnswer = answers.find((a) => a.questionId === "legend")?.choiceKey;

  if (finalAnswer && tiedLetters.includes(finalAnswer)) {
    return { letter: finalAnswer, ...TYPES[finalAnswer], counts };
  }

  const fallbackOrder = ["A", "B", "C", "D"];
  const fallbackWinner = fallbackOrder.find((letter) =>
    tiedLetters.includes(letter)
  );

  return { letter: fallbackWinner, ...TYPES[fallbackWinner], counts };
}