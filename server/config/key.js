import "./env.js";

let config;
if (process.env.NODE_ENV === "production") {
    config = {
        mongoURI: process.env.MONGO_URI, // 배포환경
    };
} else {
    config = {
        mongoURI: process.env.MONGO_KEY, // 개발환경
    };
}

export default config;
