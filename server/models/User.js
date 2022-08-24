import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        // 유효성 검사를 하기 위함
        type: String,
    },
    tokenExp: {
        // token 유효기간
        type: Number,
    },
});

// 🏷️ save() 이전에 실행하는 함수
userSchema.pre("save", function (next) {
    const user = this; // this === userSchema
    // password가 변경될 때만 bcrypt를 이용하여 비밀번호를 암호화
    if (user.isModified("password")) {
        // saltRounds 설정값으로 salt를 생성
        bcrypt.genSalt(saltRounds, function (error, salt) {
            if (error) return next(error); // pre() 빠져나가기
            // salt가 성공적으로 생성되면, req를 통해 전달받은 password를 salt를 이용해서 암호화
            bcrypt.hash(user.password, salt, function (error, hash) {
                if (error) return next(error);
                user.password = hash; // 암호화된 비밀번호(hash)를 user의 password로 DB에 저장
                next();
            });
        });
    } else {
        next(); // pre() 빠져나가기
    }
});

// 🏷️ 커스텀 함수 - 비밀번호 같은지 확인
userSchema.methods.comparePassword = function (plainPasswrod, callback) {
    // 로그인 요청에 들어온 password와 DB에 저장된 password(hashed)와 같은지 확인
    bcrypt.compare(plainPasswrod, this.password, function (error, isMatch) {
        if (error) return callback(error);
        return callback(null, isMatch);
    });
};

// 🏷️ 커스텀 함수 - 토큰 생성
userSchema.methods.generateToken = function (callback) {
    const user = this;
    // 🔗 토큰을 생성하는 방법 : user._id + 'secretToken' => token
    const token = jwt.sign(user._id.toHexString(), "secretToken"); // 토큰 생성
    user.token = token;
    user.save((error, user) => {
        if (error) return callback(error);
        return callback(null, user);
    });
};

// 🏷️ 커스텀 함수 - 토큰으로 유저 찾기
userSchema.statics.findByToken = function (token, callback) {
    const user = this;
    // 🔗 토큰 복호화 하는 방법 : 'secretToken' => user._id
    jwt.verify(token, "secretToken", function (error, decoded) {
        // 유저 데이터베이스에 복호화된 user_id와 클라이언트에서 보낸 token이 쌍으로 있다면, 인증 성공
        user.findOne({ _id: decoded, token: token }, function (error, user) {
            if (error) return callback(error);
            return callback(null, user);
        });
    });
};

export const User = mongoose.model("User", userSchema);
