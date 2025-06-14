"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Checkbox } from "@/registry/new-york/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/registry/new-york/ui/radio-group";
import { Progress } from "@/registry/new-york/ui/progress";
import { useToast } from "@/registry/new-york/hooks/use-toast";
import { submitQuiz } from "@/registry/new-york/dynamic-components/quiz/actions/quiz-actions";
import type { Quiz } from "@/registry/new-york/dynamic-components/quiz/lib/types";

interface QuizTakerProps {
  quiz: Quiz;
}

export function QuizTaker({ quiz }: QuizTakerProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progressPercentage =
    (currentQuestionIndex / (totalQuestions - 1)) * 100;

  // Handle next question
  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Handle previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Handle option selection for single-choice and true-false questions
  const handleSingleOptionSelect = (questionId: string, optionId: string) => {
    setAnswers({
      ...answers,
      [questionId]: [optionId],
    });
  };

  // Handle option selection for multiple-choice questions
  const handleMultipleOptionSelect = (
    questionId: string,
    optionId: string,
    isChecked: boolean,
  ) => {
    const currentAnswers = answers[questionId] || [];

    if (isChecked) {
      setAnswers({
        ...answers,
        [questionId]: [...currentAnswers, optionId],
      });
    } else {
      setAnswers({
        ...answers,
        [questionId]: currentAnswers.filter((id) => id !== optionId),
      });
    }
  };

  // Check if all questions have been answered
  const isQuizComplete = () => {
    return quiz.questions.every((question) => {
      const questionAnswers = answers[question.id] || [];
      return questionAnswers.length > 0;
    });
  };

  // Handle quiz submission
  const handleSubmit = async () => {
    if (!isQuizComplete()) {
      toast({
        title: "Incomplete Quiz",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitQuiz({
        quizId: quiz.id,
        answers: Object.entries(answers).map(
          ([questionId, selectedOptionIds]) => ({
            questionId,
            selectedOptionIds,
          }),
        ),
      });

      if (result.success) {
        toast({
          title: "Quiz Submitted",
          description: "Your quiz has been submitted successfully.",
        });
        router.push(`/quizzes/${quiz.id}/results/${result.submission?.id}`);
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <CardTitle>{quiz.title}</CardTitle>
          {quiz.description && (
            <p className="text-muted-foreground">{quiz.description}</p>
          )}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span>
                {currentQuestion.points}{" "}
                {currentQuestion.points === 1 ? "point" : "points"}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">{currentQuestion.text}</h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.type === "multiple-choice" ? (
                // Multiple choice options (checkboxes)
                currentQuestion.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={(answers[currentQuestion.id] || []).includes(
                        option.id,
                      )}
                      onCheckedChange={(checked) =>
                        handleMultipleOptionSelect(
                          currentQuestion.id,
                          option.id,
                          checked === true,
                        )
                      }
                    />
                    <label
                      htmlFor={option.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.text}
                    </label>
                  </div>
                ))
              ) : (
                // Single choice or true-false options (radio buttons)
                <RadioGroup
                  value={(answers[currentQuestion.id] || [])[0] || ""}
                  onValueChange={(value) =>
                    handleSingleOptionSelect(currentQuestion.id, value)
                  }
                >
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={option.id} id={option.id} />
                      <label
                        htmlFor={option.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.text}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentQuestionIndex < totalQuestions - 1 ? (
            <Button type="button" onClick={nextQuestion}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Submitting...</>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Submit Quiz
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
