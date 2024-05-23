const { signUp, signIn } = require("@controller/v1/auth");

const authRouter = (router) => {
  router.post("/auth/sign-up", signUp);
  router.post("/auth/sign-in", signIn);
};

module.exports = authRouter;
