"use client";

import React, { forwardRef } from "react";
import { motion, Variants, HTMLMotionProps } from "motion/react";

// Animation variants following Motion.dev patterns
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

// Motion components with gesture animations
interface MotionButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  asChild?: boolean;
}

export const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ children, variant = "primary", asChild = false, className = "", ...props }, ref) => {
    const MotionComponent = asChild ? motion.div : motion.button;
    
    return (
      <MotionComponent
        ref={ref}
        className={className}
        whileHover={{ 
          scale: 1.02,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        whileTap={{ 
          scale: 0.98,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);

MotionButton.displayName = "MotionButton";

interface MotionCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hover?: boolean;
}

export const MotionCard = forwardRef<HTMLDivElement, MotionCardProps>(
  ({ children, hover = true, className = "", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        whileHover={
          hover
            ? {
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }
            : {}
        }
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

MotionCard.displayName = "MotionCard";

interface MotionContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  stagger?: boolean;
}

export const MotionContainer = forwardRef<HTMLDivElement, MotionContainerProps>(
  ({ children, stagger = false, className = "", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger ? staggerContainer : fadeInUp}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

MotionContainer.displayName = "MotionContainer";

interface MotionTextProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
}

export const MotionText = forwardRef<HTMLDivElement, MotionTextProps>(
  ({ children, delay = 0, className = "", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              delay,
              ease: [0.6, -0.05, 0.01, 0.99],
            },
          },
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

MotionText.displayName = "MotionText";

// Floating animation for hero elements
export const MotionFloat = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={className}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

MotionFloat.displayName = "MotionFloat";

// Parallax scroll component
interface MotionParallaxProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  offset?: number;
}

export const MotionParallax = forwardRef<HTMLDivElement, MotionParallaxProps>(
  ({ children, offset = 50, className = "", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ y: offset }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.8,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

MotionParallax.displayName = "MotionParallax";
