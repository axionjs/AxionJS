"use client";

import { useRef, useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Card, CardContent } from "@/registry/default/ui/card";
import { Badge } from "@/registry/default/ui/badge";
import { StarIcon } from "lucide-react";
import { motion, useInView, useAnimation } from "motion/react";

export default function TestimonialsFeatured() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section ref={ref} className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Loved by developers worldwide
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our registry/new-york are used by thousands of developers to build
            modern, accessible web applications.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-12 max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <motion.div variants={itemVariants} className="md:col-span-2">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <Avatar className="h-14 w-14">
                      <AvatarImage
                        src="https://randomuser.me/api/portraits/women/32.jpg"
                        alt="Emma Thompson"
                      />
                      <AvatarFallback>ET</AvatarFallback>
                    </Avatar>
                    <div className="flex">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <StarIcon
                            key={i}
                            className="h-5 w-5 fill-primary text-primary"
                          />
                        ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <blockquote className="text-lg font-medium">
                      "Axion.js has completely transformed our development
                      workflow. The registry/new-york are beautifully designed,
                      accessible by default, and incredibly flexible. We've cut
                      our development time in half while improving the quality
                      of our UI."
                    </blockquote>
                    <div className="mt-6">
                      <p className="font-medium">Emma Thompson</p>
                      <p className="text-muted-foreground text-sm">
                        CTO at TechForward
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="https://randomuser.me/api/portraits/men/42.jpg"
                        alt="James Wilson"
                      />
                      <AvatarFallback>JW</AvatarFallback>
                    </Avatar>
                    <div className="flex">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <StarIcon
                            key={i}
                            className="h-4 w-4 fill-primary text-primary"
                          />
                        ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <blockquote className="text-sm">
                      "As a solo developer, Axion.js has been a game-changer.
                      The documentation is excellent, and the registry/new-york
                      just work."
                    </blockquote>
                    <div className="mt-4">
                      <p className="text-sm font-medium">James Wilson</p>
                      <p className="text-muted-foreground text-xs">
                        Freelance Developer
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="md:col-span-2 lg:col-span-1"
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src="https://randomuser.me/api/portraits/women/52.jpg"
                        alt="Sophia Chen"
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div className="flex">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <StarIcon
                            key={i}
                            className="h-4 w-4 fill-primary text-primary"
                          />
                        ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <blockquote className="text-sm">
                      "The accessibility features in Axion.js are exceptional.
                      It's rare to find a component library that prioritizes
                      a11y without compromising on design."
                    </blockquote>
                    <div className="mt-4">
                      <p className="text-sm font-medium">Sophia Chen</p>
                      <p className="text-muted-foreground text-xs">
                        UX Designer at DesignHub
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-3">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="md:col-span-1">
                      <div className="flex flex-col items-center justify-center md:items-start">
                        <div className="text-center md:text-left">
                          <p className="text-3xl font-bold">4.9/5</p>
                          <div className="mt-2 flex">
                            {Array(5)
                              .fill(null)
                              .map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className="h-5 w-5 fill-primary text-primary"
                                />
                              ))}
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Based on 1,200+ reviews
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 md:col-span-2">
                      <div className="flex items-center">
                        <div className="flex">
                          {Array(5)
                            .fill(null)
                            .map((_, i) => (
                              <StarIcon
                                key={i}
                                className="h-4 w-4 fill-primary text-primary"
                              />
                            ))}
                        </div>
                        <div className="ml-4 h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: "92%" }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">92%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex">
                          {Array(4)
                            .fill(null)
                            .map((_, i) => (
                              <StarIcon
                                key={i}
                                className="h-4 w-4 fill-primary text-primary"
                              />
                            ))}
                          <StarIcon className="h-4 w-4 text-muted" />
                        </div>
                        <div className="ml-4 h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: "6%" }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">6%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex">
                          {Array(3)
                            .fill(null)
                            .map((_, i) => (
                              <StarIcon
                                key={i}
                                className="h-4 w-4 fill-primary text-primary"
                              />
                            ))}
                          {Array(2)
                            .fill(null)
                            .map((_, i) => (
                              <StarIcon
                                key={i}
                                className="h-4 w-4 text-muted"
                              />
                            ))}
                        </div>
                        <div className="ml-4 h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: "2%" }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">2%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex">
                          {Array(2)
                            .fill(null)
                            .map((_, i) => (
                              <StarIcon
                                key={i}
                                className="h-4 w-4 fill-primary text-primary"
                              />
                            ))}
                          {Array(3)
                            .fill(null)
                            .map((_, i) => (
                              <StarIcon
                                key={i}
                                className="h-4 w-4 text-muted"
                              />
                            ))}
                        </div>
                        <div className="ml-4 h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">0%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex">
                          <StarIcon className="h-4 w-4 fill-primary text-primary" />
                          {Array(4)
                            .fill(null)
                            .map((_, i) => (
                              <StarIcon
                                key={i}
                                className="h-4 w-4 text-muted"
                              />
                            ))}
                        </div>
                        <div className="ml-4 h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">0%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
