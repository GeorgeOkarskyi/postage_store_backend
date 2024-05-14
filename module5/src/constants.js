const USER_NOT_FOUND_MESSAGE = 'User not found';
const METHOD_NOT_ALLOWED_ERROR_MESSAGE = 'Method Not Allowed';
const API_ROOT_PATH =  '/api/users';
const CONTENT_TYPE_HEADER = {
    'Content-Type': 'application/json'
}
const ROUTE_NOT_FOUND_MESSAGE = 'Not found';
const HOBBIES_API_PATH = new RegExp(`^${API_ROOT_PATH}/([^/]+)/hobbies$`);
const USER_DELETE_API_PATH = new RegExp(`^${API_ROOT_PATH}/([^\/]+)$`);

const RequestMethods = {
    POST: 'POST',
    GET: 'GET',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
};
const ServerResponseCodes = {
    OK: 200,
    NotFound: 404,
    Created: 201,
    InternalServerError: 500,
    MethodNotAllowed: 405
};

module.exports = {
    API_ROOT_PATH,
    RequestMethods,
    ServerResponseCodes,
    CONTENT_TYPE_HEADER,
    USER_NOT_FOUND_MESSAGE,
    METHOD_NOT_ALLOWED_ERROR_MESSAGE,
    ROUTE_NOT_FOUND_MESSAGE,
    HOBBIES_API_PATH,
    USER_DELETE_API_PATH
}
