"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/registry/new-york/ui/tabs";
import { Search } from "lucide-react";
import { Input } from "@/registry/new-york/ui/input";

const faqCategories = [
  {
    id: "general",
    label: "General",
    faqs: [
      {
        question: "What is Axion.js?",
        answer:
          "Axion.js is a modern UI component library designed for building responsive, accessible web applications. It provides a comprehensive set of registry/new-york that are highly customizable and follow best practices for web development.",
      },
      {
        question: "Is Axion.js free to use?",
        answer:
          "Yes, Axion.js is open-source and free to use for both personal and commercial projects. We offer premium plans with additional features and support for enterprise users.",
      },
      {
        question: "How do I get started with Axion.js?",
        answer:
          "To get started, install Axion.js via npm or yarn, import the registry/new-york you need, and start building your application. Our comprehensive documentation provides examples and guides to help you get up and running quickly.",
      },
    ],
  },
  {
    id: "technical",
    label: "Technical",
    faqs: [
      {
        question: "Does Axion.js support server-side rendering?",
        answer:
          "Yes, Axion.js fully supports server-side rendering (SSR) with frameworks like Next.js. All registry/new-york are designed to work seamlessly in both client and server environments.",
      },
      {
        question: "Can I use Axion.js with my existing React project?",
        answer:
          "Axion.js is designed to integrate easily with existing React projects. You can install it as a dependency and start using the registry/new-york right away without any major changes to your project structure.",
      },
      {
        question: "How does theming work in Axion.js?",
        answer:
          "Axion.js uses a powerful theming system based on CSS variables. You can customize colors, typography, spacing, and other design tokens to match your brand. The library also includes built-in support for dark mode and other color schemes.",
      },
    ],
  },
  {
    id: "support",
    label: "Support",
    faqs: [
      {
        question: "How can I get help with Axion.js?",
        answer:
          "We offer multiple support channels. You can ask questions in our community forum, join our Discord server, or open issues on GitHub. For enterprise users, we provide dedicated support through our premium plans.",
      },
      {
        question: "Do you offer custom development services?",
        answer:
          "Yes, our team can help with custom development, integration, and optimization of Axion.js for your specific needs. Contact our sales team for more information about our professional services.",
      },
      {
        question: "How often is Axion.js updated?",
        answer:
          "We release updates regularly, typically every 2-4 weeks for minor updates and bug fixes. Major versions with new features and improvements are released quarterly. We follow semantic versioning to ensure backward compatibility.",
      },
    ],
  },
];

export default function FaqTabs() {
  const [activeTab, setActiveTab] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter FAQs based on search term
  const allFaqs = faqCategories.flatMap((category) =>
    category.faqs.map((faq) => ({
      ...faq,
      category: category.id,
      categoryLabel: category.label,
    }))
  );

  const filteredFaqs = searchTerm
    ? allFaqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const showSearchResults = searchTerm.length > 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.h2
        className="text-3xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Frequently Asked Questions
      </motion.h2>

      <motion.p
        className="text-center text-muted-foreground mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Find answers to common questions about our platform
      </motion.p>

      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for answers..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {showSearchResults ? (
          <motion.div
            key="search-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-medium">
              {filteredFaqs.length}{" "}
              {filteredFaqs.length === 1 ? "result" : "results"} for "
              {searchTerm}"
            </h3>

            {filteredFaqs.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                No results found. Try a different search term.
              </p>
            ) : (
              filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="border rounded-lg p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-1 bg-muted rounded-full">
                      {faq.categoryLabel}
                    </span>
                  </div>
                  <h4 className="font-medium mb-2">{faq.question}</h4>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </motion.div>
              ))
            )}
          </motion.div>
        ) : (
          <motion.div
            key="tabs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Tabs
              defaultValue="general"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-3 mb-8">
                {faqCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {faqCategories.map((category) => (
                <TabsContent
                  key={category.id}
                  value={category.id}
                  className="space-y-6"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {category.faqs.map((faq, index) => (
                        <motion.div
                          key={index}
                          className="border rounded-lg p-4 mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{
                            y: -5,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                          }}
                        >
                          <h4 className="font-medium mb-2">{faq.question}</h4>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
