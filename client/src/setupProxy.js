const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true,
        })
    );
};

// Proxy Server란? 사용자와 인터넷 사이에 있는 서버로써,
// 1. 회사에서 직원들이나 집안에서 아이들 인터넷 접근 제어
// 2. 캐쉬를 이용해 더 빠른 인터넷 이용 제공
// 3. 더 나은 보안 제공(사용자의 IP를 바꿔서 접근하는 사용자의 IP를 모르도록)
// 4. 이용 제한된 사이트 접근 가능
