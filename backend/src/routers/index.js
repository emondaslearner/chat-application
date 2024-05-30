const express = require("express");
const authenticate = require("@middleware/authenticate");

// routers
const authRoutes = require("./auth");
const userRoutes = require("./user");
const friendRoutes = require("./friend");
const friendRequestRoutes = require("./friendRequest");

const router = express.Router();

// auth
authRoutes(router);

// user
userRoutes(router, authenticate);

// friend
friendRoutes(router, authenticate);

// friend-request
friendRequestRoutes(router, authenticate);

module.exports = router;
