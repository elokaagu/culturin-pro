// Safe localStorage utility for Next.js SSR compatibility

export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.warn("Error accessing localStorage:", error);
        return null;
      }
    }
    return null;
  },

  setItem: (key: string, value: string): void => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.warn("Error setting localStorage:", error);
      }
    }
  },

  removeItem: (key: string): void => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.warn("Error removing from localStorage:", error);
      }
    }
  },
};
