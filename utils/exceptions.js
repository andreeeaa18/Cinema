export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ResourceNotFoundException extends AppError {
  constructor(resource = "Resursa") {
    super(`${resource} nu a fost gasit/a`, 404);
  }
}

export class DuplicateResourceException extends AppError {
  constructor(message = "Resursa exista deja") {
    super(message, 409);
  }
}

export class InvalidDataException extends AppError {
  constructor(message = "Datele furnizate sunt invalide") {
    super(message, 400);
  }
}
