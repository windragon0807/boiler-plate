if (process.env.NODE_ENV === "production") {
    // 환경변수가 배포 버전일 경우,
    module.exports = require("./prod"); // prod.js에서 변수를 가져온다.
} else {
    module.exports = require("./dev");
}
