const {resultsController, createController, resultController,
deleteController, updateController} = require("../controllers/user.controller");
const {route} = require("../helpers/httpRouter");

module.exports = function() {
     return [
        route.get("/results", resultsController),
        route.post("/insert", createController),
        route.get("/result", resultController),
        route.delete("/delete", deleteController),
        route.put("/update", updateController)
      ];
}
