export default class ResponseError extends Error {
    code: number;
    message: string;
    response: {
        headers: { [key: string]: string };
        body: {
            errors?: Array<{
                message: string;
                field: string;
                help: string;
            }>;
            [key: string]: any; // Handle any other properties that might be in the body
        };
    };

    constructor(response: any);

    toString(): string;

    toJSON(): {
        message: string;
        code: number;
        response: {
            headers: { [key: string]: string };
            body: {
                errors?: Array<{
                    message: string;
                    field: string;
                    help: string;
                }>;
                [key: string]: any;
            };
        };
    };
}