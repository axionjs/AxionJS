import { unsubscribeByToken } from "@/registry/new-york/dynamic-components/subscribe-newsletter/actions/subscribe-newsletter-actions";
import { useState } from "react";

export function useUnsubscribeForm(token: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [message, setMessage] = useState("");

  const handleUnsubscribe = async () => {
    setIsLoading(true);
    try {
      const result = await unsubscribeByToken(token);
      setIsUnsubscribed(result.success);
      setMessage(result.message);

      if (result.success) {
        window.location.href = "/newsletter";
      }
    } catch (error) {
      setIsUnsubscribed(false);
      setMessage(
        "An error occurred while processing your request. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isUnsubscribed,
    message,
    handleUnsubscribe,
  };
}
