export const enum ServerResponseCodes  {
    OK = 200,
    Unauthorized = 401,
    Forbidden = 403,
    InternalServerError = 500,
    NotFound = 404,
    BadRequest = 400,
    MethodNotAllowed = 405
};

export const USER_ID_HEADER_KEY = 'x-user-id';
export const USER_ID_ADMIN_VALUE = 'admin';

export const USER_IS_NOT_AUTHORIZED_MESSAGE = 'User is not authorized';
export const FORBIDEN_MESSAGE = 'You must be authorized user';
export const BAD_REQUEST_MESSAGE = 'Bad request';
export const NO_PRODUCT_FOUND_MESSAGE = 'No product with such id';
export const NO_ITEMS_IN_CART_FOUND_MESSAGE = 'No items in the cart were found';
export const SERVER_STARTED_MESSAGE = 'Server is running on port:';
export const NO_CART_FOUND_MESSAGE = 'Cart not found';