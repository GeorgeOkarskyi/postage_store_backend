const { getUserId } = require('../utils');
const { deleteUser } = require('../dataStorage');
const { ServerResponseCodes, CONTENT_TYPE_HEADER, USER_NOT_FOUND_MESSAGE } = require('../constants');

const deleteUserAPI = (req, res) => {
    const userId = getUserId(req.url);
    const result = deleteUser(userId);
    const status = result ? ServerResponseCodes.OK : ServerResponseCodes.NotFound;

    res.writeHead(status, CONTENT_TYPE_HEADER);
    res.end(JSON.stringify(result ? { data: { success: true } } : { error: USER_NOT_FOUND_MESSAGE }));
}

module.exports = {
    deleteUserAPI
}