import { computeResult } from "../utils/quizLogic";

describe("computeResult", () => {
  test("returns correct winner when one letter clearly wins", () => {
    const answers = [
      { questionId: "job", choiceKey: "A" },
      { questionId: "vacation", choiceKey: "A" },
      { questionId: "pierogi-share", choiceKey: "B" },
      { questionId: "polka-volunteer", choiceKey: "A" },
      { questionId: "legend", choiceKey: "D" },
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

  test("legend question counts as double weight", () => {
    const answers = [
      { questionId: "job", choiceKey: "A" },
      { questionId: "vacation", choiceKey: "B" },
      { questionId: "pierogi-share", choiceKey: "C" },
      { questionId: "polka-volunteer", choiceKey: "D" },
      { questionId: "legend", choiceKey: "D" },
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

  test("tie is broken by legend answer", () => {
    const answers = [
      { questionId: "job", choiceKey: "A" },
      { questionId: "vacation", choiceKey: "B" },
      { questionId: "pierogi-share", choiceKey: "A" },
      { questionId: "polka-volunteer", choiceKey: "B" },
      { questionId: "legend", choiceKey: "B" },
    ];

    const result = computeResult(answers);

    expect(result.letter).toBe("B");
  });

  test("returns correct personality and guide metadata", () => {
    const answers = [
      { questionId: "job", choiceKey: "C" },
      { questionId: "vacation", choiceKey: "C" },
      { questionId: "pierogi-share", choiceKey: "A" },
      { questionId: "polka-volunteer", choiceKey: "D" },
      { questionId: "legend", choiceKey: "C" },
    ];

    const result = computeResult(answers);

    expect(result.letter).toBe("C");
    expect(result.personality).toBe("Crafter");
    expect(result.guide).toBe("Rebirth of Poland");
  });

  test("returns all count totals correctly", () => {
    const answers = [
      { questionId: "job", choiceKey: "A" },
      { questionId: "vacation", choiceKey: "B" },
      { questionId: "pierogi-share", choiceKey: "C" },
      { questionId: "polka-volunteer", choiceKey: "D" },
      { questionId: "legend", choiceKey: "A" },
    ];

    const result = computeResult(answers);

    expect(result.counts).toEqual({
      A: 3,
      B: 1,
      C: 1,
      D: 1,
    });
  });

  test("falls back to A when there is a tie and legend is not among tied letters", () => {
    const answers = [
      { questionId: "job", choiceKey: "A" },
      { questionId: "vacation", choiceKey: "B" },
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
      { questionId: "job", choiceKey: "D" },
      { questionId: "vacation", choiceKey: "D" },
      { questionId: "pierogi-share", choiceKey: "D" },
      { questionId: "polka-volunteer", choiceKey: "D" },
      { questionId: "legend", choiceKey: "D" },
    ];

    const result = computeResult(answers);

    expect(result.counts).toEqual({
      A: 0,
      B: 0,
      C: 0,
      D: 6,
    });
    expect(result.letter).toBe("D");
    expect(result.personality).toBe("Adventurer");
  });

  test("handles a quiz with only the legend answer", () => {
    const answers = [{ questionId: "legend", choiceKey: "B" }];

    const result = computeResult(answers);

    expect(result.counts).toEqual({
      A: 0,
      B: 2,
      C: 0,
      D: 0,
    });
    expect(result.letter).toBe("B");
  });

  test("handles a quiz with only non-legend answers", () => {
    const answers = [
      { questionId: "job", choiceKey: "C" },
      { questionId: "vacation", choiceKey: "C" },
      { questionId: "pierogi-share", choiceKey: "A" },
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

  test("legend can create the winning result even if another letter led before the final question", () => {
    const answers = [
      { questionId: "job", choiceKey: "A" },
      { questionId: "vacation", choiceKey: "A" },
      { questionId: "pierogi-share", choiceKey: "D" },
      { questionId: "polka-volunteer", choiceKey: "C" },
      { questionId: "legend", choiceKey: "D" },
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
