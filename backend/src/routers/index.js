const express = require("express");
const authenticate = require("@middleware/authenticate");

// routers
const authRoutes = require("./auth");
const userRoutes = require("./user");
const friendRoutes = require("./friend");

const router = express.Router();

//auth
authRoutes(router);

// user
userRoutes(router, authenticate);

// friend
friendRoutes(router, authenticate);

module.exports = router;
