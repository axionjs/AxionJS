"use client";

import { useRef, useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Card, CardContent } from "@/registry/default/ui/card";
import { motion, useInView, useAnimation } from "motion/react";

type Testimonial = {
  name: string;
  role: string;
  image: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Jonathan Yombo",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    quote:
      "Axion.js is really extraordinary and very practical, no need to break your head. A real gold mine.",
  },
  {
    name: "Yves Kalume",
    role: "GDE - Android",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    quote:
      "With no experience in webdesign I just redesigned my entire website in a few minutes with tailwindcss thanks to Axion.js.",
  },
  {
    name: "Yucel Faruksahan",
    role: "UI Kit Creator",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    quote:
      "Great work on the component library. This is one of the best design systems that I have seen so far :)",
  },
  {
    name: "Anonymous author",
    role: "Doing something",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    quote:
      "I am really new to Tailwind and I want to give a go to make some page on my own. I searched a lot of hero pages and blocks online. However, most of them are not giving me a clear view or needed some HTML/CSS coding background to make some changes from the original or too expensive to have. I downloaded Axion.js which is very clear to understand at the start and you could modify the codes/blocks to fit perfectly on your purpose of the page.",
  },
  {
    name: "Shekinah Tshiokufila",
    role: "Senior Software Engineer",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    quote:
      "Axion.js is redefining the standard of web design, with these blocks it provides an easy and efficient way for those who love beauty but may lack the time to implement it. I can only recommend this incredible wonder.",
  },
  {
    name: "Oketa Fred",
    role: "Fullstack Developer",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    quote:
      "I absolutely love Axion.js! The component blocks are beautifully designed and easy to use, which makes creating a great-looking website a breeze.",
  },
  {
    name: "Zeki",
    role: "Founder of ChatExtend",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    quote:
      "Using Axion.js has been like unlocking a secret design superpower. It's the perfect fusion of simplicity and versatility, enabling us to create UIs that are as stunning as they are user-friendly.",
  },
  {
    name: "Joseph Kitheka",
    role: "Fullstack Developer",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    quote:
      "Axion.js has transformed the way I develop web applications. Their extensive collection of UI components, blocks, and templates has significantly accelerated my workflow. The flexibility to customize every aspect allows me to create unique user experiences. Axion.js is a game-changer for modern web development!",
  },
  {
    name: "Khatab Wedaa",
    role: "UI Creator",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    quote:
      "Axion.js is an elegant, clean, and responsive tailwind css components it's very helpful to start fast with your project.",
  },
];

// Responsive grid layout based on screen size
const getGridColumns = (testimonials: Testimonial[]) => {
  // Create columns for different screen sizes
  const smallScreen = [testimonials];

  const mediumScreen = [
    testimonials.slice(0, Math.ceil(testimonials.length / 2)),
    testimonials.slice(Math.ceil(testimonials.length / 2)),
  ];

  const largeScreen = [
    testimonials.slice(0, Math.ceil(testimonials.length / 3)),
    testimonials.slice(
      Math.ceil(testimonials.length / 3),
      Math.ceil((testimonials.length * 2) / 3),
    ),
    testimonials.slice(Math.ceil((testimonials.length * 2) / 3)),
  ];

  return { smallScreen, mediumScreen, largeScreen };
};

export default function TestimonialsGrid() {
  const { smallScreen, mediumScreen, largeScreen } =
    getGridColumns(testimonials);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section ref={ref}>
      <div className="py-16 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold">Loved by the Community</h2>
            <p className="text-body mt-6">
              Real feedback from developers who use our components every day.
            </p>
          </motion.div>

          {/* Mobile layout (1 column) */}
          <div className="mt-8 space-y-4 md:hidden">
            {smallScreen[0].map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
                controls={controls}
              />
            ))}
          </div>

          {/* Tablet layout (2 columns) */}
          <div className="mt-8 hidden md:grid md:grid-cols-2 md:gap-4 lg:hidden">
            {mediumScreen.map((column, colIndex) => (
              <div key={colIndex} className="space-y-4">
                {column.map((testimonial, index) => (
                  <TestimonialCard
                    key={index}
                    testimonial={testimonial}
                    index={index + colIndex * mediumScreen[0].length}
                    controls={controls}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Desktop layout (3 columns) */}
          <div className="mt-8 hidden lg:grid lg:grid-cols-3 lg:gap-4">
            {largeScreen.map((column, colIndex) => (
              <div key={colIndex} className="space-y-4">
                {column.map((testimonial, index) => (
                  <TestimonialCard
                    key={index}
                    testimonial={testimonial}
                    index={index + colIndex * largeScreen[0].length}
                    controls={controls}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  controls: any;
}

function TestimonialCard({
  testimonial,
  index,
  controls,
}: TestimonialCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card>
        <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
          <Avatar className="size-9">
            <AvatarImage
              alt={testimonial.name}
              src={testimonial.image || "/placeholder.svg"}
              loading="lazy"
              width="120"
              height="120"
            />
            <AvatarFallback>
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-medium">{testimonial.name}</h3>
            <span className="text-muted-foreground block text-sm tracking-wide">
              {testimonial.role}
            </span>
            <blockquote className="mt-3">
              <p className="text-gray-700 dark:text-gray-300">
                {testimonial.quote}
              </p>
            </blockquote>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
