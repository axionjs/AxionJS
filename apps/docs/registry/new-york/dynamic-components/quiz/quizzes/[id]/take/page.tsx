import { notFound } from "next/navigation";
import { getQuizById } from "@/registry/new-york/dynamic-components/quiz/actions/quiz-actions";
import { QuizTaker } from "@/registry/new-york/dynamic-components/quiz/components/quiz-taker";

interface QuizTakePageProps {
  params: {
    id: string;
  };
}

export default async function QuizTakePage({ params }: QuizTakePageProps) {
  const result = await getQuizById(params.id);
  const quiz = result.success ? result.quiz : null;

  if (!quiz) {
    notFound();
  }

  return <QuizTaker quiz={quiz} />;
}
