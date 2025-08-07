"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

// Page transition variants following Motion.dev patterns
const pageVariants = {
  initial: {
    opacity: 0,
    x: -200,
    scale: 0.8,
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    x: 200,
    scale: 1.2,
  },
};

const pageTransition = {
  type: "tween" as const,
  ease: "anticipate" as const,
  duration: 0.5,
};

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Modal transition component
interface ModalTransitionProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export const ModalTransition: React.FC<ModalTransitionProps> = ({
  children,
  isOpen,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 30,
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              y: 50,
              transition: {
                duration: 0.2,
              }
            }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Slide transition for mobile menus
interface SlideTransitionProps {
  children: React.ReactNode;
  isOpen: boolean;
  direction?: "left" | "right" | "up" | "down";
}

export const SlideTransition: React.FC<SlideTransitionProps> = ({
  children,
  isOpen,
  direction = "right",
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { x: "-100%" };
      case "right":
        return { x: "100%" };
      case "up":
        return { y: "-100%" };
      case "down":
        return { y: "100%" };
      default:
        return { x: "100%" };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={getInitialPosition()}
          animate={{ x: 0, y: 0 }}
          exit={getInitialPosition()}
          transition={{
            type: "spring" as const,
            stiffness: 300,
            damping: 30,
          }}
          className="fixed inset-0 z-50"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
