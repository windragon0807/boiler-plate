import express from "express";
import { User } from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// ๐ท๏ธ ํ์๊ฐ์
router.post("/register", (req, res) => {
    // ํ์๊ฐ์ ํ  ๋ ํ์ํ ์ ๋ณด(req.body)๋ค์ client์์ ๊ฐ์ ธ์จ๋ค.
    const user = new User(req.body);
    // DB์ ๋ฐ์ดํฐ ์ ์ฅ
    user.save((error, user) => {
        if (error) return res.json({ success: false, error });
        console.log(`\n๐ A new user [ ${user.name} ] has been registered!\n`);
        return res.status(200).json({
            success: true,
        });
    });
});
// ๐ท๏ธ ๋ก๊ทธ์ธ
router.post("/login", (req, res) => {
    // ๋ก๊ทธ์ธ์ผ๋ก ์์ฒญ๋ ์ด๋ฉ์ผ์ ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ์๋์ง ์ฐพ๋๋ค.
    User.findOne({ email: req.body.email }, (error, user) => {
        // ์์ฒญ๋ ์ด๋ฉ์ผ์ด ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ์์ผ๋ฉด, ์ค๋ฅ ๋ฉ์์ง๋ฅผ ์ ์กํ๋ค.
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "๋ฑ๋ก๋ ์ด๋ฉ์ผ์ด ์กด์ฌํ์ง ์์ต๋๋ค.",
            });
        }
        // ์์ฒญ๋ ์ด๋ฉ์ผ์ด ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ์๋ค๋ฉด, ๋น๋ฐ๋ฒํธ๊ฐ ๋ง๋์ง ํ์ธํ๋ค.
        user.comparePassword(req.body.password, (error, isMatch) => {
            if (!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: "๋น๋ฐ๋ฒํธ๊ฐ ํ๋ ธ์ต๋๋ค.",
                });
            }
            // ๋น๋ฐ๋ฒํธ๊ฐ ๋ง๋ค๋ฉด ํ ํฐ์ ์์ฑํ๋ค.
            user.generateToken((error, user) => {
                console.log(`\n๐ User [ ${user.name} ] is logged in!\n`);
                if (error) res.status(400).send(error);
                // ํ ํฐ์ ์ฟ ํค์ ์ ์ฅํ๋ค.
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id });
            });
        });
    });
});
// ๐ท๏ธ ๋ก๊ทธ์ธ ์ํ ํ์ธ
router.get("/auth", auth, (req, res) => {
    // ์ฌ๊ธฐ๊น์ง ๋ฏธ๋ค์จ์ด๋ฅผ ํต๊ณผํด ์๋ค๋ ์๊ธฐ๋ Authentication์ด true๋ผ๋ ๋ง
    res.status(200).json({
        _id: req.user._id, // ๋ฏธ๋ค์จ์ด ๋ด๋ถ์์ ์ค์ ํด์ค req.user
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
    });
});
// ๐ท๏ธ ๋ก๊ทธ์์
router.get("/logout", auth, (req, res) => {
    // ํ์ฌ ๋ก๊ทธ์ธ๋ ์ ์ ์ _id์ ๋์ผํ ๊ณ์ ์ ๋ฐ์ดํฐ๋ฒ ์ด์ค ๋ด token ๊ฐ์ ์ญ์ ํ๋ค.
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (error, user) => {
        console.log(`\n๐ User [ ${user.name} ] is logged out!\n`);
        if (error) return res.json({ success: false, error });
        // ํด๋ผ์ด์ธํธ์ ์ฟ ํค(ํ ํฐ)์ ์ญ์ ํ๋ค.
        return res.cookie("x_auth", "").status(200).send({
            success: true,
        });
    });
});

export default router;
