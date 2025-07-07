"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Button } from "@/registry/default/ui/button";
import { Card, CardContent } from "@/registry/default/ui/card";
import { cn } from "@/lib/utils";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechForward",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    quote:
      "Implementing Axion.js in our design system has transformed our development workflow. We've reduced our time-to-market by 40% while maintaining exceptional quality.",
  },
  {
    name: "Michael Chen",
    role: "Lead Developer",
    company: "InnovateX",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    quote:
      "The accessibility features built into Axion.js registry/new-york have made it so much easier for us to create inclusive applications. It's rare to find a library that prioritizes accessibility without compromising on design.",
  },
  {
    name: "Emily Rodriguez",
    role: "Product Designer",
    company: "DesignHub",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    quote:
      "As a designer, I appreciate how Axion.js bridges the gap between design and development. The registry/new-york are flexible enough to match our brand while maintaining consistency across our applications.",
  },
  {
    name: "David Kim",
    role: "Frontend Architect",
    company: "BuildScale",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    quote:
      "We've tried many component libraries, but Axion.js stands out for its performance and attention to detail. The documentation is excellent, and the community support is outstanding.",
  },
  {
    name: "Aisha Patel",
    role: "UX Director",
    company: "UserFirst",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    quote:
      "Axion.js has become an essential part of our design system. The thoughtful implementation of variants and the consistent API across registry/new-york make it a joy to work with.",
  },
];

export default function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (current) => (current - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            Testimonials
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            What our users say
          </h2>
          <p className="mt-4 max-w-[700px] text-muted-foreground">
            Don't just take our word for it. Here's what developers and
            designers have to say about Axion.js.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <Card className="border-none bg-transparent shadow-none">
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-xl bg-background p-2">
                <div className="flex items-center justify-center">
                  <div className="relative w-full overflow-hidden p-6 md:p-10">
                    <div
                      className="transition-all duration-500"
                      style={{
                        transform: `translateX(-${activeIndex * 100}%)`,
                      }}
                    >
                      <div
                        className="flex w-full"
                        style={{ width: `${testimonials.length * 100}%` }}
                      >
                        {testimonials.map((testimonial, index) => (
                          <div
                            key={index}
                            className="w-full flex-shrink-0 px-4 md:px-8"
                            style={{ width: `${100 / testimonials.length}%` }}
                          >
                            <div className="flex flex-col items-center text-center">
                              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                <Quote className="h-6 w-6 text-primary" />
                              </div>
                              <blockquote className="mb-6 text-lg md:text-xl">
                                "{testimonial.quote}"
                              </blockquote>
                              <Avatar className="h-16 w-16 border-4 border-background">
                                <AvatarImage
                                  src={testimonial.image || "/placeholder.svg"}
                                  alt={testimonial.name}
                                />
                                <AvatarFallback>
                                  {testimonial.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="mt-4">
                                <h3 className="font-medium">
                                  {testimonial.name}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                  {testimonial.role}, {testimonial.company}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={prevTestimonial}
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        className={cn(
                          "h-2 w-2 rounded-full transition-all",
                          activeIndex === index
                            ? "bg-primary w-4"
                            : "bg-primary/30",
                        )}
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={nextTestimonial}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
