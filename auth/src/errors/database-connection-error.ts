import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  reason = "Error connecting to database.";
  statusCode = 500;
  constructor() {
    super("Error Connecting to database");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    return [
      {
        message: "Database connection error",
        field: "Server Error",
      },
    ];
  }
}
