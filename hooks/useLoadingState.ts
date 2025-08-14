import { useState, useEffect, useCallback, useRef } from 'react';

interface UseLoadingStateOptions {
  timeout?: number; // Timeout in milliseconds
  onTimeout?: () => void; // Callback when timeout occurs
  autoReset?: boolean; // Whether to auto-reset loading state after timeout
}

export function useLoadingState(options: UseLoadingStateOptions = {}) {
  const {
    timeout = 10000, // Default 10 second timeout
    onTimeout,
    autoReset = true
  } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    isMountedRef.current = false;
  }, []);

  // Set loading with timeout protection
  const setLoadingWithTimeout = useCallback((isLoading: boolean) => {
    if (!isMountedRef.current) return;

    setLoading(isLoading);
    
    if (isLoading) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          console.warn(`Loading timeout after ${timeout}ms - forcing loading to false`);
          setLoading(false);
          setError("Loading timeout - please refresh the page");
          
          if (onTimeout) {
            onTimeout();
          }
        }
      }, timeout);
    } else {
      // Clear timeout when loading is set to false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [timeout, onTimeout]);

  // Start loading
  const startLoading = useCallback(() => {
    setError(null);
    setLoadingWithTimeout(true);
  }, [setLoadingWithTimeout]);

  // Stop loading
  const stopLoading = useCallback(() => {
    setLoadingWithTimeout(false);
  }, [setLoadingWithTimeout]);

  // Set error and stop loading
  const setErrorAndStopLoading = useCallback((errorMessage: string) => {
    if (isMountedRef.current) {
      setError(errorMessage);
      setLoadingWithTimeout(false);
    }
  }, [setLoadingWithTimeout]);

  // Reset state
  const reset = useCallback(() => {
    if (isMountedRef.current) {
      setLoading(false);
      setError(null);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setErrorAndStopLoading,
    reset,
    setLoading: setLoadingWithTimeout,
    setError
  };
}
