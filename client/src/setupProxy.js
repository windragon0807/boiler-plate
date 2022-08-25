const { createProxyMiddleware } = require("http-proxy-middleware");

// 🏷️ CORS 이슈 솔루션 - Proxy Server
module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true,
        })
    );
};
