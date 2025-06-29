"use client";

import React from "react";

// Navigation compatibility layer for React Router migration
export const useNavigate = () => {
  return (path: string) => {
    if (typeof window !== "undefined") {
      window.location.href = path;
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

// Link component compatibility
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
    if (onClick) {
      onClick(e);
    }
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
      if (replace) {
        window.location.replace(to);
      } else {
        window.location.href = to;
      }
    }
  }, [to, replace]);

  return null;
};
