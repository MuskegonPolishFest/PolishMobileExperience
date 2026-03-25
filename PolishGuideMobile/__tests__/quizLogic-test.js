import { computeResult } from "../utils/quizLogic";

describe("computeResult", () => {
  test("returns correct winner when one letter clearly wins", () => {
    const answers = [
      { questionId: "pierogi", choiceKey: "A" },
      { questionId: "kielbasa", choiceKey: "A" },
      { questionId: "chopin", choiceKey: "B" },
      { questionId: "polka", choiceKey: "A" },
      { questionId: "achiever", choiceKey: "D" },
    ];

    const result = computeResult(answers);

    expect(result.letter).toBe("A");
    expect(result.counts).toEqual({
      A: 3,
      B: 1,
      C: 0,
      D: 2,
    });
  });

  test("achiever question counts as double weight", () => {
    const answers = [
      { questionId: "pierogi", choiceKey: "A" },
      { questionId: "kielbasa", choiceKey: "B" },
      { questionId: "chopin", choiceKey: "C" },
      { questionId: "polka", choiceKey: "D" },
      { questionId: "achiever", choiceKey: "D" },
    ];

    const result = computeResult(answers);

    expect(result.counts).toEqual({
      A: 1,
      B: 1,
      C: 1,
      D: 3,
    });
    expect(result.letter).toBe("D");
  });

  test("tie is broken by achiever answer", () => {
    const answers = [
      { questionId: "pierogi", choiceKey: "A" },
      { questionId: "kielbasa", choiceKey: "B" },
      { questionId: "chopin", choiceKey: "A" },
      { questionId: "polka", choiceKey: "B" },
      { questionId: "achiever", choiceKey: "B" },
    ];

    const result = computeResult(answers);

    expect(result.letter).toBe("B");
  });

  test("returns correct personality and guide metadata", () => {
    const answers = [
      { questionId: "pierogi", choiceKey: "C" },
      { questionId: "kielbasa", choiceKey: "C" },
      { questionId: "chopin", choiceKey: "A" },
      { questionId: "polka", choiceKey: "D" },
      { questionId: "achiever", choiceKey: "C" },
    ];

    const result = computeResult(answers);

    expect(result.letter).toBe("C");
    expect(result.personality).toBe("Engineer");
    expect(result.guide).toBe("Crafter Guide to Rebuilding and Rebirth of Poland");
  });

  test("returns all count totals correctly", () => {
    const answers = [
      { questionId: "pierogi", choiceKey: "A" },
      { questionId: "kielbasa", choiceKey: "B" },
      { questionId: "chopin", choiceKey: "C" },
      { questionId: "polka", choiceKey: "D" },
      { questionId: "achiever", choiceKey: "A" },
    ];

    const result = computeResult(answers);

    expect(result.counts).toEqual({
      A: 3,
      B: 1,
      C: 1,
      D: 1,
    });
  });

  test("falls back to A when there is a tie and achiever is not among tied letters", () => {
    const answers = [
      { questionId: "pierogi", choiceKey: "A" },
      { questionId: "kielbasa", choiceKey: "B" },
    ];

    const result = computeResult(answers);

    expect(result.counts).toEqual({
      A: 1,
      B: 1,
      C: 0,
      D: 0,
    });
    expect(result.letter).toBe("A");
  });

  test("handles all answers being the same letter", () => {
    const answers = [
      { questionId: "pierogi", choiceKey: "D" },
      { questionId: "kielbasa", choiceKey: "D" },
      { questionId: "chopin", choiceKey: "D" },
      { questionId: "polka", choiceKey: "D" },
      { questionId: "achiever", choiceKey: "D" },
    ];

    const result = computeResult(answers);

    expect(result.counts).toEqual({
      A: 0,
      B: 0,
      C: 0,
      D: 6,
    });
    expect(result.letter).toBe("D");
    expect(result.personality).toBe("Adventurous");
  });

  test("handles a quiz with only the achiever answer", () => {
    const answers = [{ questionId: "achiever", choiceKey: "B" }];

    const result = computeResult(answers);

    expect(result.counts).toEqual({
      A: 0,
      B: 2,
      C: 0,
      D: 0,
    });
    expect(result.letter).toBe("B");
  });

  test("handles a quiz with only non-achiever answers", () => {
    const answers = [
      { questionId: "pierogi", choiceKey: "C" },
      { questionId: "kielbasa", choiceKey: "C" },
      { questionId: "chopin", choiceKey: "A" },
    ];

    const result = computeResult(answers);

    expect(result.counts).toEqual({
      A: 1,
      B: 0,
      C: 2,
      D: 0,
    });
    expect(result.letter).toBe("C");
  });

  test("achiever can create the winning result even if another letter led before the final question", () => {
    const answers = [
      { questionId: "pierogi", choiceKey: "A" },
      { questionId: "kielbasa", choiceKey: "A" },
      { questionId: "chopin", choiceKey: "D" },
      { questionId: "polka", choiceKey: "C" },
      { questionId: "achiever", choiceKey: "D" },
    ];

    const result = computeResult(answers);

    expect(result.counts).toEqual({
      A: 2,
      B: 0,
      C: 1,
      D: 3,
    });
    expect(result.letter).toBe("D");
  });
});