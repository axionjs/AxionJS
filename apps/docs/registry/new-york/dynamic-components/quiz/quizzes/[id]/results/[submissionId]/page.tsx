import { notFound } from "next/navigation";
import { getQuizSubmission } from "@/registry/new-york/dynamic-components/quiz/actions/quiz-actions";
import { QuizResults } from "@/registry/new-york/dynamic-components/quiz/components/quiz-results";

interface QuizResultsPageProps {
  params: {
    id: string;
    submissionId: string;
  };
}

export default async function QuizResultsPage({
  params,
}: QuizResultsPageProps) {
  const result = await getQuizSubmission(params.submissionId);
  const submission = result.success ? result.submission : null;

  if (!submission || submission.quiz.id !== params.id) {
    notFound();
  }

  return <QuizResults submission={submission} />;
}
