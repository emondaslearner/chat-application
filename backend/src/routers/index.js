const express = require("express");

// routers
const authRouter = require("./auth");

const router = express.Router();

//auth
authRouter(router);

module.exports = router;
