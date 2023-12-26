import httpStatus from "http-status";
import { HttpError } from "./http.error";

/**
 * bad request error class
 */
export class BadRequestError extends HttpError {
  constructor(error: any, message = "Bad Request") {
    super(error, httpStatus.BAD_REQUEST, message);
  }
}

/**
 * not found error class
 */
export class NotFoundError extends HttpError {
  constructor(error: any, message = "Not Found") {
    super(error, httpStatus.NOT_FOUND, message);
  }
}

/**
 * server internal server error class
 */
export class InternalServerError extends HttpError {
  constructor(error: any, message = "Internal Server Error") {
    super(error, httpStatus.INTERNAL_SERVER_ERROR, message);
  }
}

/**
 * unauthorized error class
 */
export class UnauthorizedError extends HttpError {
  constructor(error: any, message = "Unauthorized") {
    super(error, httpStatus.UNAUTHORIZED, message);
  }
}

/**
 * forbidden error class
 */
export class ForbiddenError extends HttpError {
  constructor(error: any, message = "Forbidden") {
    super(error, httpStatus.FORBIDDEN, message);
  }
}

/**
 * conflict error class
 */
export class ConflictError extends HttpError {
  constructor(error: any, message = "Conflict") {
    super(error, httpStatus.CONFLICT, message);
  }
}

/**
 * unprocessable entity error
 */
export class UnprocessableEntityError extends HttpError {
  constructor(error: any, message = "Unprocessable Entity") {
    super(error, httpStatus.UNPROCESSABLE_ENTITY, message);
  }
}

/**
 * serviceUnavailable error
 */
export class ServiceUnavailableError extends HttpError {
  constructor(error: any, message = "Service Unavailable") {
    super(error, httpStatus.SERVICE_UNAVAILABLE, message);
  }
}

/**
 * gatewayTimeout error
 */
export class GatewayTimeoutError extends HttpError {
  constructor(error: any, message = "Gateway Timeout") {
    super(error, httpStatus.GATEWAY_TIMEOUT, message);
  }
}

/**
 * badGateway error
 */
export class BadGatewayError extends HttpError {
  constructor(error: any, message = "Bad Gateway") {
    super(error, httpStatus.BAD_GATEWAY, message);
  }
}

/**
 * tooManyRequest error
 */
export class TooManyRequestsError extends HttpError {
  constructor(error: any, message = "Too Many Requests") {
    super(error, httpStatus.TOO_MANY_REQUESTS, message);
  }
}
