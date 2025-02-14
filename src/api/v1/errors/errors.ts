export class ServiceError extends Error {
    statusCode?: string | number;
    code?: string | number; // Optional error code

    constructor(message: string, statusCode?: string | number, code?: string | number) {
        super(message);
        this.name = "ServiceError";
        this.statusCode = statusCode;
        this.code = code;
    }
}

export class RepositoryError extends Error {
    statusCode?: string | number;
    code?: string | number; // Optional error code

    constructor(message: string, statusCode?: string | number, code?: string | number) {
        super(message);
        this.name = "RepositoryError";
        this.statusCode = statusCode;
        this.code = code;
    }
}