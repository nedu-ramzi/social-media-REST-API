export class ApplicationError extends Error {
    constructor(message: string, statusCode: number) {
        super(message);
    }

}