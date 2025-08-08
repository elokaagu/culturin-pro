"use client";

import React from "react";

// Add smooth transition utility
const addPageTransition = (callback: () => void) => {
  // Add fade-out effect
  document.body.style.transition = "opacity 0.3s ease";
  document.body.style.opacity = "0.7";

  // Execute navigation after fade-out
  setTimeout(() => {
    callback();
  }, 150);
};

// Navigation compatibility layer for React Router migration
export const useNavigate = () => {
  return (path: string) => {
    if (typeof window !== "undefined") {
      // Use Next.js router if available, otherwise fallback to window.location
      if (typeof window !== "undefined" && window.next) {
        addPageTransition(() => {
          window.location.href = path;
        });
      } else {
        addPageTransition(() => {
          window.location.href = path;
        });
      }
    }
  };
};

export const useLocation = () => {
  if (typeof window !== "undefined") {
    return {
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      state: null,
      key: "default",
    };
  }
  return {
    pathname: "/",
    search: "",
    hash: "",
    state: null,
    key: "default",
  };
};

export const useParams = () => {
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);

    const params: Record<string, string> = {};

    // Extract common parameter patterns
    if (path.startsWith("/blog/") && segments.length > 1) {
      params.slug = segments[1];
    }

    if (path.startsWith("/experience/") && segments.length > 1) {
      params.id = segments[1];
    }

    if (path.startsWith("/tour/") && segments.length > 1) {
      params.slug = segments[1];
    }

    if (path.startsWith("/careers/apply/") && segments.length > 2) {
      params.jobId = segments[2];
    }

    if (path.startsWith("/press/") && segments.length > 1) {
      params.articleId = segments[1];
    }

    if (path.startsWith("/whats-new/") && segments.length > 1) {
      params.id = segments[1];
    }

    return params;
  }
  return {};
};

// Link component compatibility with smooth transitions
export const Link = ({
  to,
  children,
  className,
  onClick,
  ...props
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: any;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (onClick) {
      onClick(e);
    }

    // Add smooth transition before navigation
    addPageTransition(() => {
      window.location.href = to;
    });
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

// Navigate component compatibility (for redirects)
export const Navigate = ({
  to,
  replace,
}: {
  to: string;
  replace?: boolean;
}) => {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      addPageTransition(() => {
        if (replace) {
          window.location.replace(to);
        } else {
          window.location.href = to;
        }
      });
    }
  }, [to, replace]);

  return null;
};

// Add page load transition effect
if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    document.body.style.transition = "opacity 0.4s ease";
    document.body.style.opacity = "1";
  });

  // Add fade-in effect on page load
  document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "0";
    setTimeout(() => {
      document.body.style.transition = "opacity 0.4s ease";
      document.body.style.opacity = "1";
    }, 50);
  });
}
