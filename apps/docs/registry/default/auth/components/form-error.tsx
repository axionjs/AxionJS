import { AlertTriangleIcon } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 bg-destructive/15 p-3 rounded-md text-sm text-destructive">
      <AlertTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
