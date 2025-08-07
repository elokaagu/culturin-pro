"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Magnetic button effect (popular in Motion.dev examples)
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  strength = 0.3,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setMousePosition({ x, y });
  };

  return (
    <motion.button
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

// Hover card with tilt effect
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltStrength?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  tiltStrength = 10,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setRotateX(-y * tiltStrength);
    setRotateY(x * tiltStrength);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
      style={{ transformStyle: "preserve-3d" }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  );
};

// Expandable card
interface ExpandableCardProps {
  children: React.ReactNode;
  expandedContent: React.ReactNode;
  className?: string;
}

export const ExpandableCard: React.FC<ExpandableCardProps> = ({
  children,
  expandedContent,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={className}
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div layout="position">{children}</motion.div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            layout="position"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              opacity: { duration: 0.2 },
              height: { duration: 0.3 },
            }}
          >
            {expandedContent}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Floating action button with menu
interface FloatingMenuProps {
  mainButton: React.ReactNode;
  menuItems: React.ReactNode[];
  className?: string;
}

export const FloatingMenu: React.FC<FloatingMenuProps> = ({
  mainButton,
  menuItems,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`fixed bottom-6 right-6 ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 space-y-2"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: {
                transition: { staggerChildren: 0.1, delayChildren: 0.1 },
              },
              closed: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 },
              },
            }}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  open: {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                  },
                  closed: {
                    y: 30,
                    opacity: 0,
                    scale: 0.3,
                  },
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                }}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        {mainButton}
      </motion.button>
    </div>
  );
};

// Swipe to delete/action
interface SwipeActionProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  className?: string;
}

export const SwipeAction: React.FC<SwipeActionProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftAction,
  rightAction,
  className = "",
}) => {
  const [dragX, setDragX] = useState(0);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background actions */}
      <div className="absolute inset-0 flex">
        {leftAction && (
          <div className="flex-1 flex items-center justify-start pl-4 bg-red-500 text-white">
            {leftAction}
          </div>
        )}
        {rightAction && (
          <div className="flex-1 flex items-center justify-end pr-4 bg-green-500 text-white">
            {rightAction}
          </div>
        )}
      </div>

      {/* Draggable content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -200, right: 200 }}
        onDrag={(_, info) => setDragX(info.offset.x)}
        onDragEnd={(_, info) => {
          if (info.offset.x < -100 && onSwipeLeft) {
            onSwipeLeft();
          } else if (info.offset.x > 100 && onSwipeRight) {
            onSwipeRight();
          }
          setDragX(0);
        }}
        animate={{ x: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className="bg-white relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
};

// Loading spinner
export const LoadingSpinner: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <motion.div
      className={`w-8 h-8 border-2 border-culturin-indigo border-t-transparent rounded-full ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};
