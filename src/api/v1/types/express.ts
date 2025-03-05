import { Request, Response, NextFunction } from "express";

export type MiddlewareFunction = (
	req: Request,
	res: Response,
	next: NextFunction
) => void;

export type RequestBody = Record<string, unknown>;


export interface AuthenticatedRequest<T = Record<string, unknown>> extends Request {
  body: T;
  user?: {
    uid: string;
    role: string;
  };
}
