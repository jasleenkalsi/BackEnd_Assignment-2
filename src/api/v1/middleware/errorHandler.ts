import { Request, Response, NextFunction } from "express";

// Define a Custom Error Class for Application Errors
class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Global Error Handling Middleware
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err.message);

    // If it's an instance of our custom AppError, use its status code
    const statusCode = err instanceof AppError ? err.statusCode : 500;

    res.status(statusCode).json({
        status: "error",
        message: err.message || "Internal Server Error",
    });
};

export { errorHandler, AppError };
