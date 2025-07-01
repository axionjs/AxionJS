import { notFound } from "next/navigation";
import { getQuizById } from "@/registry/default/dynamic-components/quiz/actions/quiz-actions";
import { QuizBuilder } from "@/registry/default/dynamic-components/quiz/components/quiz-builder";

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

  return (
    <div className="container mx-auto px-24">
      <QuizBuilder quiz={quiz} isEditing />
    </div>
  );
}
