
type SuccessResponse<T> = {
    status: 'success';
    data: T;
};

type FailResponse = {
    status: 'fail';
    data: Record<string, any>;
};

type ErrorResponse = {
    status: 'error';
    message: string;
    code?: number;
    data?: Record<string, any>;
};

export const apiResponse = {
    success<T>(data: T): SuccessResponse<T> {
        return {
            status: 'success',
            data,
        };
    },

    fail(data: Record<string, any>): FailResponse {
        return {
            status: 'fail',
            data,
        };
    },

    error(message: string, code?: number, data?: Record<string, any>): ErrorResponse {
        return {
            status: 'error',
            message,
            code,
            data,
        };
    },
};