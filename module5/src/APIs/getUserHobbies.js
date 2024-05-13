const { getUserId } = require('../utils');
const { getUserHobbies } = require('../dataStorage');
const { ServerResponseCodes, CONTENT_TYPE_HEADER, USER_NOT_FOUND_MESSAGE } = require('../constants');

const getUserHobbiesAPI = (req, res) => {
    const userId = getUserId(req.url);
    const hobbies = getUserHobbies(userId);
    const status = hobbies ? ServerResponseCodes.OK : ServerResponseCodes.NotFound;

    res.writeHead(status, {
        ...CONTENT_TYPE_HEADER,
        'Cache-Control': 'private, max-age=3600'
    });
    res.end(JSON.stringify(hobbies ? { data: hobbies } : { error: USER_NOT_FOUND_MESSAGE }));
}


module.exports = {
    getUserHobbiesAPI
}