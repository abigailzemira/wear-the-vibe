import Swal from 'sweetalert2';

export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

export class ErrorHandler {
  static async showError(error: ApiError | string, title?: string) {
    const errorMessage = typeof error === 'string' ? error : error.message;
    const errorTitle = title || 'Error';
    
    await Swal.fire({
      icon: 'error',
      title: errorTitle,
      text: errorMessage,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'
      }
    });
  }

  static async showSuccess(message: string, title?: string) {
    await Swal.fire({
      icon: 'success',
      title: title || 'Success',
      text: message,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md'
      }
    });
  }

  static async showWarning(message: string, title?: string) {
    await Swal.fire({
      icon: 'warning',
      title: title || 'Warning',
      text: message,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md'
      }
    });
  }

  static async showConfirm(message: string, title?: string): Promise<boolean> {
    const result = await Swal.fire({
      icon: 'question',
      title: title || 'Confirm',
      text: message,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2',
        cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md'
      }
    });
    
    return result.isConfirmed;
  }

  static createApiError(message: string, status?: number, details?: any): ApiError {
    return {
      message,
      status,
      details
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
        data.error.details || data.details
      );
    }
    
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error
      throw ErrorHandler.createApiError(
        'Network error. Please check your internet connection.',
        0,
        error
      );
    }
    throw error;
  }
}
