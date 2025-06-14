import { notFound } from "next/navigation";
import { getQuizById } from "@/registry/new-york/dynamic-components/quiz/actions/quiz-actions";
import { QuizBuilder } from "@/registry/new-york/dynamic-components/quiz/components/quiz-builder";

interface QuizEditPageProps {
  params: {
    id: string;
  };
}

export default async function QuizEditPage({ params }: QuizEditPageProps) {
  const result = await getQuizById(params.id);
  const quiz = result.success ? result.quiz : null;

  if (!quiz) {
    notFound();
  }

  return <QuizBuilder quiz={quiz} isEditing />;
}
