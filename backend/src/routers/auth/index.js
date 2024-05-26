const { signUp, signIn, refreshToken } = require("@controller/v1/auth");

const authRoutes = (router) => {
  router.post("/auth/sign-up", signUp);
  router.post("/auth/sign-in", signIn);
  router.post("/auth/refresh", refreshToken);
};

module.exports = authRoutes;
