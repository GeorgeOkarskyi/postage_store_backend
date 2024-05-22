const { RequestMethods, ServerResponseCodes, CONTENT_TYPE_HEADER, METHOD_NOT_ALLOWED_ERROR_MESSAGE } = require('../constants');
const { deleteUserAPI } = require('../APIs/deleteUser');
const { addUserAPI } = require('../APIs/addUser');
const { getUserAPI } = require('../APIs/getUsers');

async function userRouteHandler(req, res) {
  switch (req.method) {
    case RequestMethods.DELETE:
      deleteUserAPI(req, res);
      break;
    case RequestMethods.POST:
      await addUserAPI(req, res);
      break;
    case RequestMethods.GET:
      getUserAPI(req, res);
      break;
    default: 
      res.writeHead(ServerResponseCodes.MethodNotAllowed, CONTENT_TYPE_HEADER );
      res.end(JSON.stringify({error: METHOD_NOT_ALLOWED_ERROR_MESSAGE}));
  };
}

exports.userRouteHandler = userRouteHandler;