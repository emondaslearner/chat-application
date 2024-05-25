const express = require("express");
const authenticate = require("@middleware/authenticate");

// routers
const authRouter = require("./auth");
const userRoutes = require("./user");

const router = express.Router();

//auth
authRouter(router);

// user
userRoutes(router, authenticate);

module.exports = router;
