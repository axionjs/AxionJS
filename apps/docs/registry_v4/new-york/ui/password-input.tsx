"use client";

import * as React from "react";
import { Input } from "@/registry/new-york/ui/input";

interface PasswordRequirement {
  regex: RegExp;
  text: string;
}

interface StrengthCheck {
  met: boolean;
  text: string;
}

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const checkStrength = (password: string): StrengthCheck[] => {
  const requirements: PasswordRequirement[] = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[0-9]/, text: "At least 1 number" },
    { regex: /[a-z]/, text: "At least 1 lowercase letter" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  ];

  return requirements.map((req) => ({
    met: req.regex.test(password),
    text: req.text,
  }));
};

const getStrengthColor = (score: number): string => {
  if (score === 0) return "bg-border";
  if (score <= 1) return "bg-red-500";
  if (score <= 2) return "bg-orange-500";
  if (score === 3) return "bg-amber-500";
  return "bg-emerald-500";
};

const getStrengthText = (score: number): string => {
  if (score === 0) return "Enter a password";
  if (score <= 2) return "Weak password";
  if (score === 3) return "Medium password";
  return "Strong password";
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  error,
}) => {
  const strength = checkStrength(value);
  const strengthScore = strength.filter((req) => req.met).length;

  return (
    <div>
      <Input
        id="password"
        type="password"
        placeholder="Enter your password"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
      <div
        className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-label="Password strength"
        aria-valuenow={strengthScore}
        aria-valuemin={0}
        aria-valuemax={4}
      >
        <div
          className={`h-full ${getStrengthColor(
            strengthScore,
          )} transition-all duration-500`}
          style={{ width: `${(strengthScore / 4) * 100}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm">{getStrengthText(strengthScore)}</p>
      <ul className="mt-2 space-y-1 text-xs">
        {strength.map((req, index) => (
          <li
            key={index}
            className={`flex items-center gap-2 ${
              req.met ? "text-emerald-500" : "text-muted-foreground"
            }`}
          >
            {req.met ? "✓" : "✕"} {req.text}
          </li>
        ))}
      </ul>
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default PasswordInput;
