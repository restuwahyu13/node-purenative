const {parse} = require("url");

/**
 *
 * @description function method for handling data from body as req.body in express js
 */

function body(incoming, callback) {
  let body = {};
  incoming.on('data', chunk => {
    body = chunk.toString();
    let data = JSON.parse(body);
    callback(data);
  });
}

/**
 *
 * @description function method for handling data from query as req.query in express js
 */

function query(incoming, callback) {
  let queryParse = parse(incoming.url, true).query;
  callback(queryParse);
}

module.exports = {body, query};
