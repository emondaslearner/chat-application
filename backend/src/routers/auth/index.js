const { signUp } = require("@controller/v1/auth");

const authRouter = (router) => {
  router.post("/auth/sign-up", signUp);
};

module.exports = authRouter;
