"use client";

import { useCallback } from "react";
import { ErrorHandler, ApiError, apiCall } from "@/src/lib/error-handler";

export function useErrorHandler() {
  const showError = useCallback(
    async (error: ApiError | string, title?: string) => {
      await ErrorHandler.showError(error, title);
    },
    []
  );

  const showSuccess = useCallback(async (message: string, title?: string) => {
    await ErrorHandler.showSuccess(message, title);
  }, []);

  const showWarning = useCallback(async (message: string, title?: string) => {
    await ErrorHandler.showWarning(message, title);
  }, []);

  const showConfirm = useCallback(
    async (message: string, title?: string): Promise<boolean> => {
      return await ErrorHandler.showConfirm(message, title);
    },
    []
  );
  const handleApiCall = useCallback(
    async <T = any>(
      url: string,
      options?: RequestInit,
      showErrorAlert: boolean = true
    ): Promise<T | null> => {
      try {
        return await apiCall<T>(url, options);
      } catch (error) {
        if (showErrorAlert) {
          const apiError = error as ApiError;

          // Check if this is a Spotify token expiration error
          if (ErrorHandler.isSpotifyTokenExpired(apiError)) {
            await ErrorHandler.showSpotifyTokenExpired();
          } else {
            await showError(apiError);
          }
        }
        return null;
      }
    },
    [showError]
  );
  const handleApiCallWithCustomError = useCallback(
    async <T = any>(
      url: string,
      options?: RequestInit,
      customErrorMessage?: string
    ): Promise<T | null> => {
      try {
        return await apiCall<T>(url, options);
      } catch (error) {
        const apiError = error as ApiError;

        // Check if this is a Spotify token expiration error
        if (ErrorHandler.isSpotifyTokenExpired(apiError)) {
          await ErrorHandler.showSpotifyTokenExpired();
        } else {
          const errorToShow = customErrorMessage || apiError.message;
          await showError(errorToShow);
        }
        return null;
      }
    },
    [showError]
  );
  const handleSpotifyTokenExpired = useCallback(async (): Promise<boolean> => {
    return await ErrorHandler.showSpotifyTokenExpired();
  }, []);

  const redirectToSpotifyLogin = useCallback(() => {
    ErrorHandler.redirectToSpotifyLogin();
  }, []);

  return {
    showError,
    showSuccess,
    showWarning,
    showConfirm,
    handleApiCall,
    handleApiCallWithCustomError,
    handleSpotifyTokenExpired,
    redirectToSpotifyLogin,
  };
}
