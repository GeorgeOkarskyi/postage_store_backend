const { userRouteHandler } = require('./controllers/userController');
const { hobbyRouteHandler } = require('./controllers/hobbyController');
const { ServerResponseCodes, API_ROOT_PATH, HOBBIES_API_PATH, USER_DELETE_API_PATH, ROUTE_NOT_FOUND_MESSAGE } = require('./constants');

async function router(req, res) {
  const { url } = req;

  if (url.match(HOBBIES_API_PATH)) {
    return await hobbyRouteHandler(req, res);
  }
  
  if (url.startsWith(API_ROOT_PATH) || url.match(USER_DELETE_API_PATH)) {
    return await userRouteHandler(req, res);
  } 


  res.writeHead(ServerResponseCodes.NotFound);
  res.end(JSON.stringify({ error: ROUTE_NOT_FOUND_MESSAGE }));
}

exports.router = router;