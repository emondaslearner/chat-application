const express = require("express");

// routers
const authRouter = require("./auth");
const userRoutes = require("./user");

const router = express.Router();

//auth
authRouter(router);

// user
userRoutes(router);

module.exports = router;
