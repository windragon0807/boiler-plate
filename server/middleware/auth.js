import { User } from "../models/User.js";

// ๐ท๏ธ ์ฌ์ฉ์ ๋ก๊ทธ์ธ ์ธ์ฆ
export const auth = (req, res, next) => {
    // ํด๋ผ์ด์ธํธ ์ฟ ํค์์ ํ ํฐ์ ๊ฐ์ ธ์จ๋ค.
    const token = req.cookies.x_auth;
    // ํ ํฐ์ ๋ณตํธํํ ํ, ๋ฐ์ดํฐ๋ฒ ์ด์ค์์ ํด๋น ํ ํฐ๊ณผ ๋์ผํ ์ ์ ๋ฅผ ์ฐพ๋๋ค.
    User.findByToken(token, (error, user) => {
        if (error) throw error;
        if (!user) return res.json({ isAuth: false });
        req.token = token; // ๋ฏธ๋ค์จ์ด๋ฅผ ๋น ์ ธ๋๊ฐ์ ํด๋น token ๊ฐ์ ์ฌ์ฉํ๋๋ก ์ค์ 
        req.user = user;
        next(); // ๋ฏธ๋ค์จ์ด ๋น ์ ธ๋๊ฐ๊ธฐ
    });
};
