const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
// MongoDB 6.0 버전 이상에서는 useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false 옵션을 항상 지원
mongoose
    .connect(
        "mongodb+srv://ryong:abcd1234@boilerplate.qxpom94.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log(error));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
