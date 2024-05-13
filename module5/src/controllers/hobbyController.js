const { RequestMethods, ServerResponseCodes, CONTENT_TYPE_HEADER, METHOD_NOT_ALLOWED_ERROR_MESSAGE} = require('../constants');
const { getUserHobbiesAPI } = require('../APIs/getUserHobbies');
const { updateUserHobbiesAPI } = require('../APIs/updateUserHobbies');

async function hobbyRouteHandler(req, res) {
  switch (req.method) {
    case RequestMethods.PATCH:
      await updateUserHobbiesAPI(req, res)
      break;
    case RequestMethods.GET:
      getUserHobbiesAPI(req, res)
      break;
    default: 
      res.writeHead(ServerResponseCodes.MethodNotAllowed, CONTENT_TYPE_HEADER);
      res.end(JSON.stringify({error: METHOD_NOT_ALLOWED_ERROR_MESSAGE}));
  };
}

exports.hobbyRouteHandler = hobbyRouteHandler;