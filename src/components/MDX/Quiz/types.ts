export type QuizQuestion = {
  questionText: string;
  answerOptions: { answerText: string; isCorrect: boolean }[];
};

export type QuizData = { questions: QuizQuestion[] };

// JSON modules are an external boundary even when supplied by the bundler.
export function readQuizData(value: unknown): QuizData {
  if (typeof value !== 'object' || value === null || !('questions' in value) || !Array.isArray(value.questions)) {
    throw new Error('Invalid quiz data: questions must be an array');
  }
  const questions = value.questions.map((question: unknown): QuizQuestion => {
    if (
      typeof question !== 'object' ||
      question === null ||
      !('questionText' in question) ||
      typeof question.questionText !== 'string' ||
      !('answerOptions' in question) ||
      !Array.isArray(question.answerOptions)
    ) {
      throw new Error('Invalid quiz question');
    }
    const answerOptions = question.answerOptions.map((option: unknown) => {
      if (
        typeof option !== 'object' ||
        option === null ||
        !('answerText' in option) ||
        typeof option.answerText !== 'string' ||
        ('isCorrect' in option && typeof option.isCorrect !== 'boolean')
      ) {
        throw new Error('Invalid quiz answer');
      }
      // Existing quizzes omit the flag on incorrect answers.
      return { answerText: option.answerText, isCorrect: 'isCorrect' in option && option.isCorrect === true };
    });
    if (!answerOptions.length) throw new Error('Quiz question must have answers');
    return { questionText: question.questionText, answerOptions };
  });
  if (!questions.length) throw new Error('Quiz must have questions');
  return { questions };
}
