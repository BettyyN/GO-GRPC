const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/grpc-web",
    createProxyMiddleware({
      target: "http://localhost:8089",
      changeOrigin: true,
    })
  );
};
