const { getUsers } = require('../dataStorage');
const { ServerResponseCodes, CONTENT_TYPE_HEADER } = require('../constants');

const getUserAPI = async (req, res) => {
    const users = getUsers();

    res.writeHead(ServerResponseCodes.OK, CONTENT_TYPE_HEADER);
    res.end(JSON.stringify({ data: users }));
}

module.exports = {
    getUserAPI
}