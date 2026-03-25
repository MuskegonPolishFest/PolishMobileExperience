import { computeResult } from "../utils/quizLogic";

describe("computeResult", () => {

  test("returns correct winner when one letter clearly wins", () => {

    const answers = [
      { questionId: "pierogi", choiceKey: "A" },
      { questionId: "kielbasa", choiceKey: "A" },
      { questionId: "chopin", choiceKey: "B" },
      { questionId: "polka", choiceKey: "A" },
      { questionId: "achiever", choiceKey: "D" }
    ];

    const result = computeResult(answers);

    expect(result.letter).toBe("A");

    expect(result.counts).toEqual({
      A: 3,
      B: 1,
      C: 0,
      D: 2
    });

  });

  test("achiever question counts as double weight", () => {

    const answers = [
      { questionId: "pierogi", choiceKey: "A" },
      { questionId: "kielbasa", choiceKey: "B" },
      { questionId: "chopin", choiceKey: "C" },
      { questionId: "polka", choiceKey: "D" },
      { questionId: "achiever", choiceKey: "D" }
    ];

    const result = computeResult(answers);

    expect(result.counts.D).toBe(3);
    expect(result.letter).toBe("D");

  });

  test("tie is broken by achiever answer", () => {

    const answers = [
      { questionId: "pierogi", choiceKey: "A" },
      { questionId: "kielbasa", choiceKey: "B" },
      { questionId: "chopin", choiceKey: "A" },
      { questionId: "polka", choiceKey: "B" },
      { questionId: "achiever", choiceKey: "B" }
    ];

    const result = computeResult(answers);

    expect(result.letter).toBe("B");

  });

});