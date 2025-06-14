"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Progress } from "@/registry/new-york/ui/progress";
import { Separator } from "@/registry/new-york/ui/separator";
import type { QuizSubmission } from "@/registry/new-york/dynamic-components/quiz/lib/types";

interface QuizResultsProps {
  submission: QuizSubmission;
}

export function QuizResults({ submission }: QuizResultsProps) {
  const router = useRouter();

  // Calculate score percentage
  const scorePercentage = submission.maxScore
    ? Math.round(((submission.score || 0) / submission.maxScore) * 100)
    : 0;

  // Group answers by question
  const answersByQuestion = submission.answers.reduce(
    (acc, answer) => {
      if (!acc[answer.questionId]) {
        acc[answer.questionId] = [];
      }
      if (answer.optionId) {
        acc[answer.questionId].push(answer.optionId);
      }
      return acc;
    },
    {} as Record<string, string[]>,
  );

  return (
    <div className="container max-w-3xl py-6">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => router.push("/quizzes")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Quizzes
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{submission.quiz.title} - Results</CardTitle>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>
                Score: {submission.score} / {submission.maxScore}
              </span>
              <span>{scorePercentage}%</span>
            </div>
            <Progress
              value={scorePercentage}
              className={`h-2 ${
                scorePercentage >= 70
                  ? "bg-green-600"
                  : scorePercentage >= 40
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {submission?.quiz?.questions.map((question, index) => {
            // Get user's answers for this question
            const userAnswers = answersByQuestion[question.id] || [];

            // Get correct answers for this question
            const correctAnswers = question.options
              .filter((option) => option.isCorrect)
              .map((option) => option.id);

            // Check if user answered correctly
            const isCorrect =
              question.type === "multiple-choice"
                ? userAnswers.length === correctAnswers.length &&
                  userAnswers.every((id) => correctAnswers.includes(id)) &&
                  correctAnswers.every((id) => userAnswers.includes(id))
                : userAnswers.length === 1 &&
                  correctAnswers.includes(userAnswers[0]);

            return (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">
                      Question {index + 1}
                    </h3>
                    <p className="mt-1">{question.text}</p>
                  </div>
                  <div className="flex items-center">
                    {isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500" />
                    )}
                    <span className="ml-2 font-medium">
                      {isCorrect ? `+${question.points}` : "0"} /{" "}
                      {question.points}
                    </span>
                  </div>
                </div>

                <Separator className="my-3" />

                <div className="space-y-2">
                  {question.options.map((option) => {
                    const isUserSelected = userAnswers.includes(option.id);
                    const isCorrectOption = option.isCorrect;

                    return (
                      <div
                        key={option.id}
                        className={`p-2 rounded-md ${
                          isUserSelected && isCorrectOption
                            ? "bg-green-100 dark:bg-green-900/20"
                            : isUserSelected && !isCorrectOption
                              ? "bg-red-100 dark:bg-red-900/20"
                              : !isUserSelected && isCorrectOption
                                ? "bg-blue-100 dark:bg-blue-900/20"
                                : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="mr-2">
                            {isUserSelected && isCorrectOption && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            {isUserSelected && !isCorrectOption && (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            {!isUserSelected && isCorrectOption && (
                              <CheckCircle className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                          <span>{option.text}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => router.push(`/quizzes/${submission.quiz.id}/take`)}
          >
            Retake Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
