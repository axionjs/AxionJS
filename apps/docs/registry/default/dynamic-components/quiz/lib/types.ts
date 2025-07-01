export type QuestionType = "multiple-choice" | "single-choice" | "true-false";

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  points: number;
  options: QuestionOption[];
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizSubmission {
  id: string;
  quizId: string;
  userId: string;
  score?: number;
  maxScore?: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  answers: Answer[];
}

export interface Answer {
  id: string;
  questionId: string;
  optionId?: string;
  submissionId: string;
}

export interface QuizFormData {
  title: string;
  description?: string;
  questions: QuestionFormData[];
}

export interface QuestionFormData {
  id?: string;
  text: string;
  type: QuestionType;
  points: number;
  options: QuestionOptionFormData[];
}

export interface QuestionOptionFormData {
  id?: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizSubmissionFormData {
  quizId: string;
  answers: {
    questionId: string;
    selectedOptionIds: string[];
  }[];
}
