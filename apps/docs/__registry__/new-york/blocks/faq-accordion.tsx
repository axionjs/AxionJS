"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does the AI portrait generation work?",
    answer:
      "Our AI portrait generation uses advanced machine learning algorithms to create unique portraits based on your photos. The system analyzes facial features, lighting, and composition to generate high-quality portraits in various artistic styles. You can choose from multiple styles and filters to customize your results.",
  },
  {
    question: "How long does it take to receive my AI portraits?",
    answer:
      "The turnaround time depends on your selected plan. The Starter plan delivers portraits within 5 hours, the Advanced plan within 3 hours, and the Premium plan within 1 hour. During peak times, there might be slight delays, but we always strive to deliver within the promised timeframe.",
  },
  {
    question: "Can I use the generated portraits for commercial purposes?",
    answer:
      "Yes, depending on your plan. The Free plan is for personal use only. The Pro and Enterprise plans include commercial usage rights, allowing you to use the portraits for business purposes, marketing materials, and commercial projects. Always check the specific terms for your plan for detailed usage rights.",
  },
  {
    question: "What are retouch credits and how do I use them?",
    answer:
      "Retouch credits allow you to request manual adjustments to your AI-generated portraits by our professional designers. Each credit can be used for one portrait. To use a credit, simply select the portrait you want retouched in your dashboard and click the 'Request Retouch' button. Our team will enhance the portrait based on your specific instructions.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time through your account settings. If you cancel, you'll continue to have access to your plan's features until the end of your current billing period. We don't offer refunds for partial months, but you won't be charged for the next billing cycle after cancellation.",
  },
];

export default function FaqAccordion() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <motion.h2
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className={cn(
              "border rounded-lg overflow-hidden",
              expandedIndex === index ? "border-primary" : "border-border",
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <button
              className="flex items-center justify-between w-full p-4 text-left"
              onClick={() => toggleExpand(index)}
            >
              <span className="font-medium">{faq.question}</span>
              <motion.div
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 pt-0 text-muted-foreground">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
