import express from "express";
import { User } from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// 🏷️ 회원가입
router.post("/register", (req, res) => {
    // 회원가입 할 때 필요한 정보(req.body)들을 client에서 가져온다.
    const user = new User(req.body);
    // DB에 데이터 저장
    user.save((error, user) => {
        if (error) return res.json({ success: false, error });
        console.log(`\n🔔 A new user [ ${user.name} ] has been registered!\n`);
        return res.status(200).json({
            success: true,
        });
    });
});
// 🏷️ 로그인
router.post("/login", (req, res) => {
    // 로그인으로 요청된 이메일을 데이터베이스에 있는지 찾는다.
    User.findOne({ email: req.body.email }, (error, user) => {
        // 요청된 이메일이 데이터베이스에 없으면, 오류 메시지를 전송한다.
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "등록된 이메일이 존재하지 않습니다.",
            });
        }
        // 요청된 이메일이 데이터베이스에 있다면, 비밀번호가 맞는지 확인한다.
        user.comparePassword(req.body.password, (error, isMatch) => {
            if (!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다.",
                });
            }
            // 비밀번호가 맞다면 토큰을 생성한다.
            user.generateToken((error, user) => {
                console.log(`\n🔔 User [ ${user.name} ] is logged in!\n`);
                if (error) res.status(400).send(error);
                // 토큰을 쿠키에 저장한다.
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id });
            });
        });
    });
});
// 🏷️ 로그인 상태 확인
router.get("/auth", auth, (req, res) => {
    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true라는 말
    res.status(200).json({
        _id: req.user._id, // 미들웨어 내부에서 설정해준 req.user
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
    });
});
// 🏷️ 로그아웃
router.get("/logout", auth, (req, res) => {
    // 현재 로그인된 유저의 _id와 동일한 계정의 데이터베이스 내 token 값을 삭제한다.
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (error, user) => {
        console.log(`\n🔔 User [ ${user.name} ] is logged out!\n`);
        if (error) return res.json({ success: false, error });
        // 클라이언트의 쿠키(토큰)을 삭제한다.
        return res.cookie("x_auth", "").status(200).send({
            success: true,
        });
    });
});

export default router;
