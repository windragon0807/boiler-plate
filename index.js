const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/key");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

const app = express();
const port = 5000;
// 🏷️ application/x-www-form-urlencoded 데이터를 분석해서 가져올 수 있도록 해준다.
app.use(bodyParser.urlencoded({ extended: true }));
// 🏷️ application/json 데이터를 분석해서 가져올 수 있도록 해준다.
app.use(bodyParser.json());
app.use(cookieParser());

// MongoDB 6.0 버전 이상에서는 useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false 옵션을 항상 지원
mongoose
    .connect(config.mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log(error));

app.get("/", (req, res) => res.send("Hello World!"));

// 📂 회원가입
app.post("/api/users/register", (req, res) => {
    // 회원가입 할 때 필요한 정보들을 client에서 가져오고, 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body); // User(<저장할 데이터>)
    user.save((error, userInfo) => {
        // 데이터 저장
        if (error) return res.json({ success: false, error });
        return res.status(200).json({
            success: true,
        });
    });
});

// 📂 로그인
app.post("/api/users/login", (req, res) => {
    // 로그인으로 요청된 이메일을 데이터베이스에 있는지 찾는다.
    User.findOne({ email: req.body.email }, (error, user) => {
        // 요청된 이메일이 데이터베이스에 없으면, 오류 메시지를 전송한다.
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다.",
            });
        }
        // 요청된 이메일이 데이터베이스에 있다면, 비밀번호가 맞는지 확인한다. using Custom Function
        user.comparePassword(req.body.password, (error, isMatch) => {
            if (!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다.",
                });
            }
            // 비밀번호까지 맞다면 토큰을 생성한다.
            user.generateToken((error, user) => {
                if (error) return res.status(400).send(error);
                // 토큰을 쿠키에 저장
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id });
            });
        });
    });
});

// 📂 미들웨어를 사용한 사용자 로그인 상태 확인
app.get("/api/users/auth", auth, (req, res) => {
    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true라는 말
    res.status(200).json({
        _id: req.user._id, // 미들웨어 내부에서 설정해준 req.user
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

// 📂 로그아웃
app.get("/api/users/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (error, user) => {
        if (error) return res.json({ success: false, error });
        return res.status(200).send({
            success: true,
        });
    });
});

// 서버 가동
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
