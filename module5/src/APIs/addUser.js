const { addUser } = require('../dataStorage');
const { ServerResponseCodes, CONTENT_TYPE_HEADER } = require('../constants');
const { parseRequestBody } = require('../utils');

const addUserAPI = async (req, res) => {
    const reqBody = await parseRequestBody(req);
    const userInfo = JSON.parse(reqBody);
    const user = addUser(userInfo);

    res.writeHead(ServerResponseCodes.Created, CONTENT_TYPE_HEADER);
    res.end(JSON.stringify({ data: user }));
}

module.exports = {
    addUserAPI
}