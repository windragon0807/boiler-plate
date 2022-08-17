const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true, // 띄어쓰기 없애기
        unique: 1, // 중복 불가
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        // 관리자, 일반 유저 등
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        // 나중에 token을 활용한 유효성 검사 등
        type: String,
    },
    tokenExp: {
        // token 유효기간
        type: Number,
    },
});

// 스키마를 모델로 감싸준다.
const User = mongoose.model("User", userSchema);

module.exports = { User };
