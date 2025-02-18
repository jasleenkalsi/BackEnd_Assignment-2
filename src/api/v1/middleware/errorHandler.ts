import { Request, Response, NextFunction } from "express";

// 🔹 Define a Custom Error Class
class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err.message);

    const statusCode = err instanceof AppError ? err.statusCode : 500;

    res.status(statusCode).json({
        success: false,  // ✅ Ensure response has `success: false`
        message: err.message || "Internal Server Error",
    });
};

export { errorHandler, AppError };
