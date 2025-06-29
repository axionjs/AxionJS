"use server";
import { revalidatePath } from "next/cache";
import type {
  QuizFormData,
  QuizSubmissionFormData,
} from "@/registry/default/dynamic-components/quiz/lib/types";
import { db } from "@/registry/default/lib/db";

// Create a new quiz
export async function createQuiz(data: QuizFormData) {
  try {
    // In a real app, you would get the user ID from the session
    const userId = "user-placeholder-id";

    const quiz = await db.quiz.create({
      data: {
        title: data.title,
        description: data.description,
        createdById: userId,
        questions: {
          create: data.questions.map((question) => ({
            text: question.text,
            type: question.type,
            points: question.points,
            options: {
              create: question.options.map((option) => ({
                text: option.text,
                isCorrect: option.isCorrect,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    revalidatePath("/quizzes");
    return { success: true, quiz };
  } catch (error) {
    console.error("Error creating quiz:", error);
    return { success: false, error: "Failed to create quiz" };
  }
}

// Get all quizzes
export async function getQuizzes() {
  try {
    const quizzes = await db.quiz.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, quizzes };
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return { success: false, error: "Failed to fetch quizzes" };
  }
}

// Get a quiz by ID
export async function getQuizById(id: string) {
  try {
    const quiz = await db.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) {
      return { success: false, error: "Quiz not found" };
    }

    return { success: true, quiz };
  } catch (error) {
    console.error(`Error fetching quiz ${id}:`, error);
    return { success: false, error: "Failed to fetch quiz" };
  }
}

// Update a quiz
export async function updateQuiz(id: string, data: QuizFormData) {
  try {
    // First, delete existing questions and options to avoid conflicts
    await db.question.deleteMany({
      where: { quizId: id },
    });

    // Then update the quiz with new questions and options
    const quiz = await db.quiz.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        updatedAt: new Date(),
        questions: {
          create: data.questions.map((question) => ({
            text: question.text,
            type: question.type,
            points: question.points,
            options: {
              create: question.options.map((option) => ({
                text: option.text,
                isCorrect: option.isCorrect,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    revalidatePath(`/quizzes/${id}`);
    return { success: true, quiz };
  } catch (error) {
    console.error(`Error updating quiz ${id}:`, error);
    return { success: false, error: "Failed to update quiz" };
  }
}

// Delete a quiz
export async function deleteQuiz(id: string) {
  try {
    await db.quiz.delete({
      where: { id },
    });

    revalidatePath("/quizzes");
    return { success: true };
  } catch (error) {
    console.error(`Error deleting quiz ${id}:`, error);
    return { success: false, error: "Failed to delete quiz" };
  }
}

// Submit a quiz
export async function submitQuiz(data: QuizSubmissionFormData) {
  try {
    // In a real app, you would get the user ID from the session
    const userId = "user-placeholder-id";

    // Get the quiz to calculate the score
    const quizResult = await getQuizById(data.quizId);

    if (!quizResult.success || !quizResult.quiz) {
      return { success: false, error: "Quiz not found" };
    }

    const quiz = quizResult.quiz;

    // Calculate the score
    let score = 0;
    let maxScore = 0;

    // Create a map of correct options for each question
    const correctOptionsMap = new Map();

    quiz.questions.forEach((question) => {
      maxScore += question.points;
      const correctOptions = question.options
        .filter((option) => option.isCorrect)
        .map((option) => option.id);

      correctOptionsMap.set(question.id, correctOptions);
    });

    // Check each answer against the correct options
    data.answers.forEach((answer) => {
      const correctOptions = correctOptionsMap.get(answer.questionId) || [];
      const question = quiz.questions.find((q) => q.id === answer.questionId);

      if (!question) return;

      // For single-choice and true-false questions
      if (question.type === "single-choice" || question.type === "true-false") {
        if (
          answer.selectedOptionIds.length === 1 &&
          correctOptions.includes(answer.selectedOptionIds[0])
        ) {
          score += question.points;
        }
      }
      // For multiple-choice questions
      else if (question.type === "multiple-choice") {
        // All selected options must be correct and all correct options must be selected
        const allCorrectSelected = answer.selectedOptionIds.every((id) =>
          correctOptions.includes(id),
        );

        const allSelectedCorrect = correctOptions.every((id: string) =>
          answer.selectedOptionIds.includes(id),
        );

        if (allCorrectSelected && allSelectedCorrect) {
          score += question.points;
        }
      }
    });

    // Create the submission
    const submission = await db.quizSubmission.create({
      data: {
        quizId: data.quizId,
        userId,
        score,
        maxScore,
        completed: true,
        answers: {
          create: data.answers.flatMap((answer) =>
            answer.selectedOptionIds.map((optionId) => ({
              questionId: answer.questionId,
              optionId,
            })),
          ),
        },
      },
      include: {
        answers: true,
      },
    });

    revalidatePath(`/quizzes/${data.quizId}/results/${submission.id}`);
    return { success: true, submission, score, maxScore };
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return { success: false, error: "Failed to submit quiz" };
  }
}

// Get quiz submission by ID
export async function getQuizSubmission(submissionId: string) {
  try {
    const submission = await db.quizSubmission.findUnique({
      where: { id: submissionId },
      include: {
        quiz: {
          include: {
            questions: {
              include: {
                options: true,
              },
            },
          },
        },
        answers: {
          include: {
            question: true,
            selectedOption: true,
          },
        },
      },
    });

    if (!submission) {
      return { success: false, error: "Submission not found" };
    }

    return { success: true, submission };
  } catch (error) {
    console.error(`Error fetching submission ${submissionId}:`, error);
    return { success: false, error: "Failed to fetch submission" };
  }
}
