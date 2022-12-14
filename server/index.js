import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import config from "./config/key.js";
import userRouter from "./routes/user.js";

const app = express();

// π·οΈ uri νμμ λ°μ΄ν°λ₯Ό λΆμ ν, μ¬μ©ν  μ μλλ‘ μ€μ 
app.use(bodyParser.urlencoded({ extended: true }));
// π·οΈ application/json λ°μ΄ν°λ₯Ό λΆμ ν, μ¬μ©ν  μ μλλ‘ μ€μ 
app.use(bodyParser.json());
app.use(cookieParser());

// π·οΈ λ‘κ·Έ κΈ°λ‘ (morgan)
if (process.env.NODE_ENV === "production") {
    app.use(morgan("combined")); // λ°°ν¬νκ²½
} else {
    app.use(morgan("dev")); // κ°λ°νκ²½
}

// π·οΈ λΌμ°ν° μ°κ²°
app.use("/api/users", userRouter);

// π·οΈ Mongo DB μ°κ²°
mongoose
    .connect(config.mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log(error));

app.get("/", (req, res) => {
    res.send("Hello World");
});

// π·οΈ μλ² μ μ νμΈ
app.get("/api/hello", (req, res) => {
    res.send("π The connection to the server was successful!");
});

// π·οΈ μλ² κ°λ
app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), () => console.log(`Example app listening on port ${app.get("port")}!`));
