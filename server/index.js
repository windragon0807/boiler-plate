import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import config from "./config/key.js";
import userRouter from "./routes/user.js";

const app = express();

// 🏷️ uri 형식의 데이터를 분석 후, 사용할 수 있도록 설정
app.use(bodyParser.urlencoded({ extended: true }));
// 🏷️ application/json 데이터를 분석 후, 사용할 수 있도록 설정
app.use(bodyParser.json());
app.use(cookieParser());

// 🏷️ 로그 기록 (morgan)
if (process.env.NODE_ENV === "production") {
    app.use(morgan("combined")); // 배포환경
} else {
    app.use(morgan("dev")); // 개발환경
}

// 🏷️ 라우터 설정
app.use("/api/users", userRouter);

// 🏷️ Mongo DB 연결
mongoose
    .connect(config.mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log(error));

app.get("/", (req, res) => {
    res.send("Hello World");
});

// 🏷️ 서버 접속 확인
app.get("/api/hello", (req, res) => {
    res.send("🔔 The connection to the server was successful!");
});

// 🏷️ 서버 가동
app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), () => console.log(`Example app listening on port ${app.get("port")}!`));
