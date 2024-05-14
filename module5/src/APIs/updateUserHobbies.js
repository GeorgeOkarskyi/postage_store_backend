const { parseRequestBody, getUserId } = require('../utils');
const { updateUserHobbies } = require('../dataStorage');
const { ServerResponseCodes, CONTENT_TYPE_HEADER, USER_NOT_FOUND_MESSAGE } = require('../constants');

const updateUserHobbiesAPI = async (req, res) => {
    const userId = getUserId(req.url);
    const reqBody = await parseRequestBody(req);
    const { hobbies } = JSON.parse(reqBody);
    const updatedUser = updateUserHobbies(userId, hobbies);
    const status = updatedUser ? ServerResponseCodes.OK : ServerResponseCodes.NotFound;
    
    res.writeHead(status, CONTENT_TYPE_HEADER);
    res.end(JSON.stringify(updatedUser ? { data: updatedUser } : { error: USER_NOT_FOUND_MESSAGE }));
}

module.exports = {
    updateUserHobbiesAPI
}