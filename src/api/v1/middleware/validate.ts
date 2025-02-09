import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export const validateRequest = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.details.map(detail => detail.message),
            });
        }
        next();
    };
};
