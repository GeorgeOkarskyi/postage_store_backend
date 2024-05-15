export const enum ServerResponseCodes  {
    OK = 200,
    NotFound = 404,
    Created = 201,
    InternalServerError = 500,
    MethodNotAllowed = 405,
    Forbidden = 403
};

export const USER_ID_HEADER_KEY = 'x-user-id';
export const USER_ID_ADMIN_VALUE = 'admin';

export const TOKEN_NOT_PROVIDED_MESSAGE = 'Token not provided';
export const FORBIDEN_MESSAGE = 'Forbidden';

export const SERVER_STARTED_MESSAGE = 'Server is running on port:';