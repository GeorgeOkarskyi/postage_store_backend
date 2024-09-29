export const enum ServerResponseCodes  {
    OK = 200,
    Unauthorized = 401,
    Forbidden = 403,
    InternalServerError = 500,
    NotFound = 404,
    BadRequest = 400,
    MethodNotAllowed = 405,
    Conflict = 409
}

export const SERVER_STARTED_MESSAGE = 'Server is started at:';
export const BAD_REQUEST_MESSAGE = 'Bad request';

export const USER_IS_NOT_AUTHORIZED_MESSAGE = 'User is not authorized';
export const TOKEN_IS_REQUIRED_MESSAGE = 'Token is required';

export const NO_PRODUCT_FOUND_MESSAGE = 'No product with such id';
export const NO_ITEMS_IN_CART_FOUND_MESSAGE = 'No items in the cart were found';
export const NO_CART_FOUND_MESSAGE = 'Cart not found';

export const HEALTH_CHECK_FAILED_MESSAGE = 'Health check failed:';
export const DB_CONNECTION_FAILED_MESSAGE = 'Database connection failed';

export const PRODUCTION_ENVIRONMENT_NAME = 'production';
export const DEVELOPMENT_ENVIRONMENT_NAME = 'development';

export enum ServiceLevel {
    CONTROLLER = 'Controller',
    SERVICE = 'Service',
    REPOSITORY = 'Repository',
}
