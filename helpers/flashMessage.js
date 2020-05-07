const EventEmitter = require("events").EventEmitter;
const event = new EventEmitter();

function flash(incoming, code, messages) {
   event.on("flash", () => {
      incoming.writeHead(code, {"content-type": "application/json"});
      incoming.end(JSON.stringify(messages));
   });
   return event.emit("flash");
 }

module.exports = flash;
