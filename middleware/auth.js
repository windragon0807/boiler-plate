const { User } = require("../models/User");

// 인증 처리 담당하는 곳
const auth = (req, res, next) => {
    // 클라이언트 쿠키에서 토큰을 가져온다.
    const token = req.cookies.x_auth;
    // 토큰을 복호화한 후, 유저를 찾는다.
    User.findByToken(token, (error, user) => {
        if (error) throw error;
        if (!user) return res.json({ isAuth: false, error: true });

        req.token = token; // 미들웨어를 빠져나가서 해당 token 값을 사용하도록 설정
        req.user = user;
        next(); // 미들웨어 빠져나가기
    });
};

module.exports = { auth };
