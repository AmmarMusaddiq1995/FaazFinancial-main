"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";

import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const getInitials = (name: string) => {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const avatarColors = [
    "bg-orange-500",
    "bg-blue-500",
    "bg-emerald-500",
    "bg-purple-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-teal-500",
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 font-sans antialiased md:px-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${
                  avatarColors[active % avatarColors.length]
                }`}
              >
                <span className="text-lg font-bold text-white select-none">
                  {getInitials(testimonials[active].name)}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white">
                  {testimonials[active].name}
                </h3>
                {testimonials[active].designation && (
                  <p className="text-sm text-gray-500 dark:text-neutral-500">
                    {testimonials[active].designation}
                  </p>
                )}
              </div>
            </div>
            <motion.p className="mt-6 text-lg text-gray-500 dark:text-neutral-300">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={handlePrev}
            className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 dark:bg-neutral-800"
          >
            <IconArrowLeft className="h-5 w-5 text-white transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
          </button>
          <button
            onClick={handleNext}
            className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 dark:bg-neutral-800"
          >
            <IconArrowRight className="h-5 w-5 text-white transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
