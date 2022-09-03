import { Routes, Route } from "react-router-dom";
import LandingPage from "components/views/LandingPage/LandingPage";
import LoginPage from "components/views/LoginPage/LoginPage";
import RegisterPage from "components/views/RegisterPage/RegisterPage";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    );
};

export default Router;
