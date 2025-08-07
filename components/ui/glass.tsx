import React from "react";
import { cn } from "@/lib/utils";

export interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "medium" | "heavy" | "ultra" | "frosted" | "iridescent";
  layer?: 1 | 2 | 3 | 4 | 5;
  interactive?: boolean;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  children: React.ReactNode;
}

export const Glass: React.FC<GlassProps> = ({
  variant = "medium",
  layer,
  interactive = false,
  rounded = "xl",
  className,
  children,
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "light":
        return "backdrop-blur-sm bg-white/5 border border-white/10";
      case "medium":
        return "backdrop-blur-md bg-white/15 border border-white/25";
      case "heavy":
        return "backdrop-blur-xl bg-white/25 border border-white/35";
      case "ultra":
        return "backdrop-blur-2xl bg-white/30 border border-white/40";
      case "frosted":
        return "backdrop-blur-3xl bg-gradient-to-br from-white/20 to-white/5 border border-white/30";
      case "iridescent":
        return "backdrop-blur-xl bg-gradient-to-br from-white/20 via-blue-50/10 to-purple-50/10 border border-white/25";
      default:
        return "backdrop-blur-md bg-white/15 border border-white/25";
    }
  };

  const getLayerClasses = () => {
    if (!layer) return "";

    switch (layer) {
      case 1:
        return "backdrop-blur-sm bg-white/8 border border-white/15 shadow-sm";
      case 2:
        return "backdrop-blur-md bg-white/12 border border-white/20 shadow-md";
      case 3:
        return "backdrop-blur-lg bg-white/16 border border-white/25 shadow-lg";
      case 4:
        return "backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl";
      case 5:
        return "backdrop-blur-2xl bg-white/25 border border-white/35 shadow-2xl";
      default:
        return "";
    }
  };

  const getRoundedClasses = () => {
    switch (rounded) {
      case "sm":
        return "rounded-sm";
      case "md":
        return "rounded-md";
      case "lg":
        return "rounded-lg";
      case "xl":
        return "rounded-xl";
      case "2xl":
        return "rounded-2xl";
      case "3xl":
        return "rounded-3xl";
      case "full":
        return "rounded-full";
      default:
        return "rounded-xl";
    }
  };

  const classes = cn(
    // Base glass classes
    layer ? getLayerClasses() : getVariantClasses(),
    getRoundedClasses(),

    // Interactive states
    interactive &&
      "transition-all duration-300 hover:bg-white/20 hover:border-white/35 hover:shadow-2xl cursor-pointer",

    // Animation
    "animate-in fade-in duration-500",

    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export interface GlassCardProps extends GlassProps {
  padding?: "sm" | "md" | "lg" | "xl";
}

export const GlassCard: React.FC<GlassCardProps> = ({
  padding = "lg",
  className,
  children,
  ...props
}) => {
  const getPaddingClasses = () => {
    switch (padding) {
      case "sm":
        return "p-3";
      case "md":
        return "p-4";
      case "lg":
        return "p-6";
      case "xl":
        return "p-8";
      default:
        return "p-6";
    }
  };

  return (
    <Glass
      className={cn(getPaddingClasses(), "shadow-2xl", className)}
      {...props}
    >
      {children}
    </Glass>
  );
};

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "backdrop-blur-md bg-blue-500/20 border border-blue-300/30 text-white hover:bg-blue-500/30 hover:border-blue-300/40";
      case "secondary":
        return "backdrop-blur-md bg-white/20 border border-white/30 text-white hover:bg-white/30 hover:border-white/40";
      case "ghost":
        return "backdrop-blur-sm bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/30";
      default:
        return "backdrop-blur-md bg-white/20 border border-white/30 text-white hover:bg-white/30 hover:border-white/40";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-3 py-2 text-sm";
      case "md":
        return "px-4 py-2.5 text-base";
      case "lg":
        return "px-6 py-3 text-lg";
      default:
        return "px-4 py-2.5 text-base";
    }
  };

  const classes = cn(
    // Base button styles
    "rounded-lg font-medium shadow-lg transition-all duration-300",
    "hover:shadow-xl hover:scale-105 active:scale-95",
    "focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent",

    // Variant and size
    getVariantClasses(),
    getSizeClasses(),

    className
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export interface GlassInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const GlassInput: React.FC<GlassInputProps> = ({
  label,
  className,
  ...props
}) => {
  const inputClasses = cn(
    "backdrop-blur-md bg-white/10 border border-white/25 rounded-lg px-4 py-2.5",
    "placeholder:text-white/60 text-white",
    "focus:bg-white/15 focus:border-white/35 focus:ring-2 focus:ring-white/20 focus:ring-offset-transparent",
    "transition-all duration-300",
    className
  );

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white/80">
          {label}
        </label>
      )}
      <input className={inputClasses} {...props} />
    </div>
  );
};

export interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const GlassModal: React.FC<GlassModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm bg-black/20"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative backdrop-blur-2xl bg-white/20 border border-white/30 rounded-2xl shadow-3xl",
          "animate-in zoom-in-95 duration-300",
          "max-w-lg w-full max-h-[90vh] overflow-y-auto",
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="border-b border-white/20 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export interface GlassNavProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassNav: React.FC<GlassNavProps> = ({ children, className }) => {
  return (
    <nav
      className={cn(
        "backdrop-blur-lg bg-white/12 border-b border-white/20",
        "sticky top-0 z-40",
        className
      )}
    >
      {children}
    </nav>
  );
};

export interface GlassSidebarProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassSidebar: React.FC<GlassSidebarProps> = ({
  children,
  className,
}) => {
  return (
    <aside
      className={cn(
        "backdrop-blur-xl bg-white/8 border-r border-white/15",
        "h-full",
        className
      )}
    >
      {children}
    </aside>
  );
};
