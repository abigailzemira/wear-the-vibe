import Swal from "sweetalert2";

export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

export class ErrorHandler {
  static async showError(error: ApiError | string, title?: string) {
    const errorObj = typeof error === "string" ? { message: error } : error;

    // Check if this is a Spotify token expiration error
    if (typeof error !== "string" && this.isSpotifyTokenExpired(error)) {
      await this.showSpotifyTokenExpired();
      return;
    }

    const errorMessage = errorObj.message;
    const errorTitle = title || "Error";

    await Swal.fire({
      icon: "error",
      title: errorTitle,
      text: errorMessage,
      confirmButtonText: "OK",
      customClass: {
        confirmButton:
          "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md",
      },
    });
  }

  static async showSuccess(message: string, title?: string) {
    await Swal.fire({
      icon: "success",
      title: title || "Success",
      text: message,
      confirmButtonText: "OK",
      customClass: {
        confirmButton:
          "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md",
      },
    });
  }

  static async showWarning(message: string, title?: string) {
    await Swal.fire({
      icon: "warning",
      title: title || "Warning",
      text: message,
      confirmButtonText: "OK",
      customClass: {
        confirmButton:
          "bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md",
      },
    });
  }

  static async showConfirm(message: string, title?: string): Promise<boolean> {
    const result = await Swal.fire({
      icon: "question",
      title: title || "Confirm",
      text: message,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      customClass: {
        confirmButton:
          "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2",
        cancelButton:
          "bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md",
      },
    });

    return result.isConfirmed;
  }

  static createApiError(
    message: string,
    status?: number,
    details?: any
  ): ApiError {
    return {
      message,
      status,
      details,
    };
  }

  static handleApiResponse(response: Response): Response {
    if (!response.ok) {
      throw this.createApiError(
        `HTTP Error: ${response.status} ${response.statusText}`,
        response.status
      );
    }
    return response;
  }

  static async showSpotifyTokenExpired(): Promise<boolean> {
    const result = await Swal.fire({
      icon: "warning",
      title: "Spotify Session Expired",
      text: "Your Spotify session has expired. Please login again to continue.",
      showCancelButton: true,
      confirmButtonText: "Login to Spotify",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton:
          "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2",
        cancelButton:
          "bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md",
      },
    });

    if (result.isConfirmed) {
      // Redirect to Spotify login
      this.redirectToSpotifyLogin();
      return true;
    }

    return false;
  }

  static redirectToSpotifyLogin() {
    // Generate random state for security
    function generateRandomString(length: number) {
      const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      return Array.from({ length })
        .map(() => possible.charAt(Math.floor(Math.random() * possible.length)))
        .join("");
    }

    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirect_uri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
    const state = generateRandomString(16);
    const scope =
      "user-read-private user-read-email user-library-modify playlist-modify-private playlist-modify-public";

    const params = new URLSearchParams({
      response_type: "code",
      client_id: client_id || "",
      scope: scope,
      redirect_uri: redirect_uri || "",
      state: state,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params}`;
  }

  static isSpotifyTokenExpired(error: ApiError): boolean {
    // Check if error indicates Spotify token expiration
    if (error.status === 401) {
      const message = error.message.toLowerCase();
      return (
        message.includes("spotify") &&
        (message.includes("expired") ||
          message.includes("token") ||
          message.includes("session") ||
          message.includes("authentication"))
      );
    }
    return false;
  }

  static async handleSpotifyError(error: ApiError): Promise<boolean> {
    if (this.isSpotifyTokenExpired(error)) {
      return await this.showSpotifyTokenExpired();
    }
    return false;
  }
}

// Utility function for API calls with error handling
export async function apiCall<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);
    ErrorHandler.handleApiResponse(response);

    const data = await response.json();

    // Check if the response contains an error field
    if (data.error) {
      throw ErrorHandler.createApiError(
        data.error.message || data.error,
        response.status,
        data.error
      );
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error
      throw ErrorHandler.createApiError(
        "Network error. Please check your internet connection.",
        0,
        error
      );
    }
    throw error;
  }
}
