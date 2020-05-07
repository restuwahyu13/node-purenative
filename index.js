const {httpRouter, route} = require("./helpers/httpRouter");
const http = require("http");
const mongoose = require("mongoose");
const server = http.createServer(httpRouter);
const userSchema = require("./models/user.models");
const userRoute = require("./routes/user.route");

// setup global promise
mongoose.Promise = global.Promise;

// setup database connection
mongoose.connect("mongodb://localhost:/demo",
{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => console.log("database connection successfuly"))
.catch(() => console.log("database connection failed"));

// init route
userRoute();

// listening server
server.listen(3000, () => console.log(`server is running on ${server.address().port}`));
