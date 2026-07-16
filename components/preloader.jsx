"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "Hallo"];

const slideUp = {
  initial: { top: 0 },
  exit: {
    top: "-100vh",
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

const fade = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.6 } },
};

export function Preloader() {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    if (index === words.length - 1) {
      const finish = setTimeout(() => setDone(true), 500);
      return () => clearTimeout(finish);
    }
    const tick = setTimeout(() => setIndex((i) => i + 1), index === 0 ? 900 : 150);
    return () => clearTimeout(tick);
  }, [index]);

  return (
    <AnimatePresence mode="wait">
      {!done && (
        <motion.div
          variants={slideUp}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)]"
        >
          <motion.p
            key={words[index]}
            variants={fade}
            initial="initial"
            animate="enter"
            className="font-serif-display text-4xl italic text-[var(--ink)] sm:text-5xl"
          >
            {words[index]}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
