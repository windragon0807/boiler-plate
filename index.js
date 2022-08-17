const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const config = require("./config/key");
const { User } = require("./models/User");

// application/x-www-form-urlencoded 데이터를 분석해서 가져올 수 있도록 해준다.
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 데이터를 분석해서 가져올 수 있도록 해준다.
app.use(bodyParser.json());

const mongoose = require("mongoose");
// MongoDB 6.0 버전 이상에서는 useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false 옵션을 항상 지원
mongoose
    .connect(config.mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log(error));

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/register", (req, res) => {
    // 회원가입 할 때, 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body);
    user.save((error, userInfo) => {
        console.log(error);
        if (error) return res.json({ success: false, error });
        return res.status(200).json({
            success: true,
        });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
