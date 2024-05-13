const getUserId = (url) => {
    return url.split('/')[3];
};

const parseRequestBody = (req) => new Promise((resolve, reject) => {
    let body = '';
  
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      resolve(body);
    });
  
    req.on('error', (error) => {
      reject(error);
    });
});

module.exports = {
    getUserId,
    parseRequestBody
}