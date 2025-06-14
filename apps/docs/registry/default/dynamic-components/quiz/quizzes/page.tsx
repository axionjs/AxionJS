import { Suspense } from "react";
import { getQuizzes } from "@/registry/default/dynamic-components/quiz/actions/quiz-actions";
import { QuizList } from "@/registry/default/dynamic-components/quiz/components/quiz-list";

export const dynamic = "force-dynamic";

export default async function QuizzesPage() {
  const { quizzes = [] } = await getQuizzes().then((res) =>
    res.success ? res : { quizzes: [] },
  );

  const quizzesWithQuestions = quizzes.map((quiz: any) => ({
    ...quiz,
    questions: quiz.questions ?? [],
  }));

  return (
    <Suspense fallback={<div>Loading quizzes...</div>}>
      <QuizList quizzes={quizzesWithQuestions} />
    </Suspense>
  );
}
