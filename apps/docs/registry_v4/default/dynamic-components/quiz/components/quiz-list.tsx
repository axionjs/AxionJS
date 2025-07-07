"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Play, Plus } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/default/ui/alert-dialog";
import { useToast } from "@/registry/default/hooks/use-toast";
import { deleteQuiz } from "@/registry/default/dynamic-components/quiz/actions/quiz-actions";
import type { Quiz } from "@/registry/default/dynamic-components/quiz/lib/types";

interface QuizListProps {
  quizzes: Quiz[];
}

export function QuizList({ quizzes }: QuizListProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Handle quiz deletion
  const handleDeleteQuiz = async (quizId: string) => {
    setIsDeleting(quizId);

    try {
      const result = await deleteQuiz(quizId);

      if (result.success) {
        toast({
          title: "Quiz Deleted",
          description: "The quiz has been deleted successfully.",
        });
        router.refresh();
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast({
        title: "Error",
        description: "Failed to delete quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Quizzes</h1>
        <Button onClick={() => router.push("/quizzes/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Quiz
        </Button>
      </div>

      {quizzes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">
              You haven't created any quizzes yet.
            </p>
            <Button onClick={() => router.push("/quizzes/create")}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Quiz
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.id}>
              <CardHeader>
                <CardTitle className="line-clamp-1">{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2">
                  {quiz.description || "No description provided."}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/quizzes/${quiz.id}`)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Quiz</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this quiz? This action
                          cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteQuiz(quiz.id)}
                          disabled={isDeleting === quiz.id}
                        >
                          {isDeleting === quiz.id ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => router.push(`/quizzes/${quiz.id}/take`)}
                >
                  <Play className="h-4 w-4 mr-1" />
                  Take Quiz
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
