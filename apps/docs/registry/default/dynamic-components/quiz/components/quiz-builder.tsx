"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Trash2, Plus, Save, ArrowLeft } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import { Textarea } from "@/registry/default/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/default/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group";
import { Separator } from "@/registry/default/ui/separator";
import { useToast } from "@/registry/default/hooks/use-toast";
import {
  createQuiz,
  updateQuiz,
} from "@/registry/default/dynamic-components/quiz/actions/quiz-actions";
import type { Quiz } from "@/registry/default/dynamic-components/quiz/lib/types";

// Define the form validation schema
const questionOptionSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, "Option text is required"),
  isCorrect: z.boolean().default(false),
});

const questionSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, "Question text is required"),
  type: z.enum(["multiple-choice", "single-choice", "true-false"], {
    required_error: "Question type is required",
  }),
  points: z.coerce.number().int().positive().default(1),
  options: z
    .array(questionOptionSchema)
    .min(2, "At least two options are required"),
});

const quizFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
});

type QuizFormValues = z.infer<typeof quizFormSchema>;

interface QuizBuilderProps {
  quiz?: Quiz;
  isEditing?: boolean;
}

export function QuizBuilder({ quiz, isEditing = false }: QuizBuilderProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with existing quiz data or defaults
  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      title: quiz?.title || "",
      description: quiz?.description || "",
      questions: quiz?.questions || [
        {
          text: "",
          type: "single-choice",
          points: 1,
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
        },
      ],
    },
  });

  // Use field array for dynamic questions and options
  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  // Handle form submission
  const onSubmit = async (data: QuizFormValues) => {
    setIsSubmitting(true);

    try {
      // Validate that each question has at least one correct answer
      const hasInvalidQuestions = data.questions.some((question) => {
        const correctOptions = question.options.filter(
          (option) => option.isCorrect,
        );

        if (question.type === "multiple-choice") {
          return correctOptions.length === 0;
        } else {
          return correctOptions.length !== 1;
        }
      });

      if (hasInvalidQuestions) {
        toast({
          title: "Validation Error",
          description:
            "Each question must have at least one correct answer. Single-choice and true-false questions must have exactly one correct answer.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Process true-false questions to ensure they have exactly "True" and "False" options
      data.questions = data.questions.map((question) => {
        if (question.type === "true-false") {
          return {
            ...question,
            options: [
              {
                id: question.options[0]?.id,
                text: "True",
                isCorrect: question.options[0]?.isCorrect || false,
              },
              {
                id: question.options[1]?.id,
                text: "False",
                isCorrect: question.options[1]?.isCorrect || false,
              },
            ],
          };
        }
        return question;
      });

      let result;
      if (isEditing && quiz) {
        result = await updateQuiz(quiz.id, data);
      } else {
        result = await createQuiz(data);
      }

      if (result.success) {
        toast({
          title: isEditing ? "Quiz Updated" : "Quiz Created",
          description: isEditing
            ? "Your quiz has been updated successfully."
            : "Your quiz has been created successfully.",
        });
        router.push("/quizzes");
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} quiz. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add a new question
  const addQuestion = () => {
    appendQuestion({
      text: "",
      type: "single-choice",
      points: 1,
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    });
  };

  // Add a new option to a question
  const addOption = (questionIndex: number) => {
    const options = form.getValues(`questions.${questionIndex}.options`);
    form.setValue(`questions.${questionIndex}.options`, [
      ...options,
      { text: "", isCorrect: false },
    ]);
  };

  // Remove an option from a question
  const removeOption = (questionIndex: number, optionIndex: number) => {
    const options = form.getValues(`questions.${questionIndex}.options`);
    if (options.length <= 2) {
      toast({
        title: "Cannot Remove Option",
        description: "Questions must have at least two options.",
        variant: "destructive",
      });
      return;
    }

    const newOptions = [...options];
    newOptions.splice(optionIndex, 1);
    form.setValue(`questions.${questionIndex}.options`, newOptions);
  };

  // Handle question type change
  const handleQuestionTypeChange = (questionIndex: number, type: string) => {
    if (type === "true-false") {
      // For true-false questions, set exactly two options: "True" and "False"
      form.setValue(`questions.${questionIndex}.options`, [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: false },
      ]);
    }
  };

  // Handle radio option selection (for single-choice and true-false)
  const handleRadioOptionChange = (
    questionIndex: number,
    optionIndex: number,
  ) => {
    const options = form.getValues(`questions.${questionIndex}.options`);

    // Set all options to not correct
    const updatedOptions = options.map((option, idx) => ({
      ...option,
      isCorrect: idx === optionIndex,
    }));

    form.setValue(`questions.${questionIndex}.options`, updatedOptions);
  };

  return (
    <div className="container max-w-4xl py-6">
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
          <CardTitle>{isEditing ? "Edit Quiz" : "Create New Quiz"}</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Quiz Details */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quiz Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter quiz title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter quiz description"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Questions */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Questions</h3>
                  <Button
                    type="button"
                    onClick={addQuestion}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Question
                  </Button>
                </div>

                {questionFields.map((questionField, questionIndex) => (
                  <Card key={questionField.id} className="border border-muted">
                    <CardHeader className="bg-muted/50 p-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">
                          Question {questionIndex + 1}
                        </CardTitle>
                        <Button
                          type="button"
                          onClick={() => removeQuestion(questionIndex)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          disabled={questionFields.length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove question</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      {/* Question Text */}
                      <FormField
                        control={form.control}
                        name={`questions.${questionIndex}.text`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Question Text</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter your question"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Question Type */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`questions.${questionIndex}.type`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Question Type</FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  handleQuestionTypeChange(
                                    questionIndex,
                                    value,
                                  );
                                }}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select question type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="single-choice">
                                    Single Choice
                                  </SelectItem>
                                  <SelectItem value="multiple-choice">
                                    Multiple Choice
                                  </SelectItem>
                                  <SelectItem value="true-false">
                                    True/False
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`questions.${questionIndex}.points`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Points</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="1"
                                  step="1"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Options */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <FormLabel>Options</FormLabel>
                          {form.watch(`questions.${questionIndex}.type`) !==
                            "true-false" && (
                            <Button
                              type="button"
                              onClick={() => addOption(questionIndex)}
                              variant="outline"
                              size="sm"
                            >
                              <Plus className="mr-2 h-3 w-3" />
                              Add Option
                            </Button>
                          )}
                        </div>

                        <div className="space-y-2">
                          {form
                            .watch(`questions.${questionIndex}.options`)
                            ?.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className="flex items-center space-x-2"
                              >
                                {/* Option Correctness */}
                                {form.watch(
                                  `questions.${questionIndex}.type`,
                                ) === "multiple-choice" ? (
                                  <FormField
                                    control={form.control}
                                    name={`questions.${questionIndex}.options.${optionIndex}.isCorrect`}
                                    render={({ field }) => (
                                      <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                ) : (
                                  <RadioGroup
                                    value={form
                                      .watch(
                                        `questions.${questionIndex}.options`,
                                      )
                                      .findIndex((opt) => opt.isCorrect)
                                      .toString()}
                                    onValueChange={(value) =>
                                      handleRadioOptionChange(
                                        questionIndex,
                                        Number.parseInt(value),
                                      )
                                    }
                                    className="flex items-center space-x-2"
                                  >
                                    <RadioGroupItem
                                      value={optionIndex.toString()}
                                      id={`q${questionIndex}-opt${optionIndex}`}
                                    />
                                  </RadioGroup>
                                )}

                                {/* Option Text */}
                                <div className="flex-1">
                                  <FormField
                                    control={form.control}
                                    name={`questions.${questionIndex}.options.${optionIndex}.text`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            placeholder={`Option ${optionIndex + 1}`}
                                            {...field}
                                            disabled={
                                              form.watch(
                                                `questions.${questionIndex}.type`,
                                              ) === "true-false"
                                            }
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                {/* Remove Option Button */}
                                {form.watch(
                                  `questions.${questionIndex}.type`,
                                ) !== "true-false" && (
                                  <Button
                                    type="button"
                                    onClick={() =>
                                      removeOption(questionIndex, optionIndex)
                                    }
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">
                                      Remove option
                                    </span>
                                  </Button>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/quizzes")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isEditing ? "Update Quiz" : "Create Quiz"}
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
