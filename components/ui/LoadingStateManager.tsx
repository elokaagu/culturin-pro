"use client";

import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent } from './card';

interface LoadingStateManagerProps {
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  timeout?: number;
  children: React.ReactNode;
  loadingMessage?: string;
  errorMessage?: string;
  showTimeout?: boolean;
}

export function LoadingStateManager({
  loading,
  error,
  onRetry,
  timeout = 10000,
  children,
  loadingMessage = "Loading...",
  errorMessage = "Something went wrong",
  showTimeout = true
}: LoadingStateManagerProps) {
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Handle timeout
  useEffect(() => {
    if (loading && showTimeout) {
      const id = setTimeout(() => {
        setHasTimedOut(true);
      }, timeout);
      setTimeoutId(id);

      return () => {
        if (id) clearTimeout(id);
      };
    } else {
      setHasTimedOut(false);
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
    }
  }, [loading, timeout, showTimeout]);

  // Reset timeout state when loading changes
  useEffect(() => {
    if (!loading) {
      setHasTimedOut(false);
    }
  }, [loading]);

  // Show loading state
  if (loading && !hasTimedOut) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  // Show timeout state
  if (loading && hasTimedOut) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="p-6 text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Loading is taking longer than expected
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              This might be due to a slow connection or server response.
            </p>
          </div>
          <div className="flex gap-2 justify-center">
            {onRetry && (
              <Button onClick={onRetry} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            )}
            <Button 
              onClick={() => window.location.reload()} 
              size="sm"
            >
              Refresh Page
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show error state
  if (error) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="p-6 text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {errorMessage}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {error}
            </p>
          </div>
          <div className="flex gap-2 justify-center">
            {onRetry && (
              <Button onClick={onRetry} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            )}
            <Button 
              onClick={() => window.location.reload()} 
              size="sm"
            >
              Refresh Page
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show children when no loading or error
  return <>{children}</>;
}

// Hook for managing loading states with timeout protection
export function useLoadingStateWithTimeout(
  initialState = false,
  timeout = 10000
) {
  const [loading, setLoading] = useState(initialState);
  const [error, setError] = useState<string | null>(null);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const setLoadingWithTimeout = React.useCallback((isLoading: boolean) => {
    setLoading(isLoading);
    
    if (isLoading) {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        setHasTimedOut(true);
        setLoading(false);
      }, timeout);
    } else {
      // Clear timeout when loading stops
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setHasTimedOut(false);
    }
  }, [timeout]);

  const reset = React.useCallback(() => {
    setLoading(false);
    setError(null);
    setHasTimedOut(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    loading,
    error,
    hasTimedOut,
    setLoading: setLoadingWithTimeout,
    setError,
    reset
  };
}
