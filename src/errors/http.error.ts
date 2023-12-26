/**
 * Http Error Class handler api http errors
 */
export class HttpError extends Error {
  declare statusCode: number;
  declare message: string;
  declare error: string | Record<string, any>;

  constructor(
    res: string | Record<string, any>,
    status: number,
    message: string = "Failed"
  ) {
    super();
    this.statusCode = status;
    this.message = message;
    this.error = res;
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, HttpError.prototype);
    return this;
  }

  /**
   * check if error is instance of ApiError return true, else false
   */
  static isApiError(error: any) {
    return error instanceof HttpError;
  }
}
