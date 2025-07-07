"use client";

import { motion } from "motion/react";
import {
  Mail,
  MessageSquare,
  Phone,
  HelpCircle,
  FileText,
  Globe,
} from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import Link from "next/link";

const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "To reset your password, click on the 'Forgot Password' link on the login page. Enter your email address, and we'll send you instructions to create a new password. For security reasons, password reset links expire after 24 hours.",
    icon: <HelpCircle className="h-5 w-5" />,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  },
  {
    question: "Can I change my subscription plan?",
    answer:
      "Yes, you can upgrade or downgrade your subscription plan at any time from your account settings. Changes to your plan will take effect immediately, and your billing will be prorated based on the time remaining in your current billing cycle.",
    icon: <FileText className="h-5 w-5" />,
    color:
      "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  },
  {
    question: "Is my data secure?",
    answer:
      "We take data security very seriously. All data is encrypted both in transit and at rest using industry-standard encryption protocols. We regularly perform security audits and comply with GDPR, CCPA, and other privacy regulations to ensure your information is protected.",
    icon: <Globe className="h-5 w-5" />,
    color:
      "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  },
  {
    question: "How do I cancel my account?",
    answer:
      "You can cancel your account at any time by going to your account settings and selecting 'Cancel Account'. Your data will be retained for 30 days after cancellation, during which time you can reactivate your account. After 30 days, all your data will be permanently deleted.",
    icon: <HelpCircle className="h-5 w-5" />,
    color: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 14-day money-back guarantee for all new subscriptions. If you're not satisfied with our service within the first 14 days, contact our support team for a full refund. After this period, refunds are handled on a case-by-case basis according to our refund policy.",
    icon: <FileText className="h-5 w-5" />,
    color:
      "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "Our customer support team is available 24/7. You can reach us through live chat on our website, by email at support@example.com, or by phone at +1 (555) 123-4567. For technical issues, please include as much detail as possible to help us resolve your problem quickly.",
    icon: <MessageSquare className="h-5 w-5" />,
    color:
      "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400",
  },
];

const contactMethods = [
  {
    name: "Email",
    description: "Send us an email and we'll get back to you within 24 hours.",
    icon: <Mail className="h-6 w-6" />,
    href: "mailto:support@example.com",
    linkText: "support@example.com",
  },
  {
    name: "Live Chat",
    description: "Chat with our support team in real-time.",
    icon: <MessageSquare className="h-6 w-6" />,
    href: "#",
    linkText: "Start a chat",
  },
  {
    name: "Phone",
    description: "Call us directly for immediate assistance.",
    icon: <Phone className="h-6 w-6" />,
    href: "tel:+15551234567",
    linkText: "+1 (555) 123-4567",
  },
];

export default function FaqGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about our platform. If you can't find
          what you're looking for, please contact our support team.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border rounded-lg p-6 h-full"
            variants={item}
            whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
          >
            <div
              className={`${faq.color} w-10 h-10 rounded-full flex items-center justify-center mb-4`}
            >
              {faq.icon}
            </div>
            <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
            <p className="text-muted-foreground">{faq.answer}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="bg-muted rounded-xl p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
          <p className="text-muted-foreground">
            Our support team is here to help. Contact us through any of these
            channels.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              className="bg-background rounded-lg p-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                {method.icon}
              </div>
              <h4 className="font-medium mb-2">{method.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">
                {method.description}
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href={method.href}>{method.linkText}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
