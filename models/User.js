const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

// save() 이전에 실행하는 함수를 구현할 수 있다.
userSchema.pre("save", function (next) {
    // 화살표 함수로 사용하지 말고 function을 사용하자.
    const user = this; // userSchema를 가리킨다.
    // 비밀번호를 암호화
    if (user.isModified("password")) {
        // password가 변환될 때만, bcrypt를 이용하여 암호화
        bcrypt.genSalt(saltRounds, function (error, salt) {
            // saltRounds로 salt를 생성한다.
            if (error) return next(error);
            // error 없이 salt가 생성되면,
            bcrypt.hash(user.password, salt, function (error, hash) {
                // req를 통해 전달받은 password를 salt를 이용해서 암호화시키고,
                // 성공적으로 암호화가 되면 hash가 암호화된 비밀번호가 된다.
                if (error) return next(error);
                user.password = hash; // 암호화된 비밀번호를 user의 password에 저장
                next();
            });
        });
    }
});

// 스키마를 모델로 감싸준다.
const User = mongoose.model("User", userSchema);

module.exports = { User };
