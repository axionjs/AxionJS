import { useToast } from "@/registry/new-york/hooks/use-toast";
import { sendEmail } from "@/registry/new-york/dynamic-components/contact-form/actions/contact-actions";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export function useContactForm() {
  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    message: z
      .string()
      .min(10, { message: "Message must be at least 10 characters." }),
  });

  type FormValues = z.infer<typeof formSchema>;

  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsPending(true);
    setIsSuccess(false);

    try {
      const result = await sendEmail(data);
      if (result.success) {
        setIsSuccess(true);
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
          variant: "default",
        });
        form.reset();
      } else {
        toast({
          title: "Something went wrong",
          description: result.error || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to send",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  }

  return { form, onSubmit, isPending, isSuccess };
}
