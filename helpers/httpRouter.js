const {parse} = require("url");

/**
* @description function method for handling router http method
*/

let methods = {}
/**
* @description configs route
*/

 let routeConfigs = {
  get: function (method , path, handler) {
      methods[method + path] = handler;
  },
  post: function (method, path, handler) {
      methods[method + path] = handler;
  },
  delete: function (method, path, handler) {
     methods[method + path] = handler;
  },
  put: function (method, path, handler) {
    methods[method + path] = handler;
  },
  all: function (method, path, handler) {
    methods[method + path] = handler;
  }
};

/**
* method for handling http server
*
*@param req - Incoming Message
*@param res - Server Response
*/

function httpRouter(req, res) {
   let url = parse(req.url).pathname.trim();
   switch(typeof methods[req.method + url] === "function" && req.method) {
      case "GET":
      case "POST":
      case "DELETE":
      case "PUT":
      case "PATCH":
      case "OPTIONS":
      case "HEAD":
        methods[req.method + url](req, res);
        break;
      default:
      res.writeHead(404, {"content-type": "text/html"});
      res.end(`${req.method} ${url} not found`);
   }
}

/**
* @description function method for handling route from user
*/

const route = {
    get: function(path, handler) {
      routeConfigs.get("GET", path, handler);
    },
    post: function(path, handler) {
      routeConfigs.post("POST", path, handler);
    },
    delete: function(path, handler) {
      routeConfigs.delete("DELETE", path, handler);
    },
    put: function(path, handler) {
     routeConfigs.put("PUT", path, handler);
  },
    all: function(path, handler) {
    routeConfigs.all("GET", path, handler);
    routeConfigs.all("POST", path, handler);
    routeConfigs.all("DELETE", path, handler);
    routeConfigs.all("PUT", path, handler);
    routeConfigs.all("HEAD", path, handler);
    routeConfigs.all("PATCH", path, handler);
    routeConfigs.all("OPTIONS", path, handler);
  }
}

module.exports = {httpRouter, route}
