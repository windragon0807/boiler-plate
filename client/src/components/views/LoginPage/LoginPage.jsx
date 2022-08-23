import { useState } from "react";
import styled from "styled-components";
import { Box } from "../../../styles/common/layout";
import { useDispatch } from "react-redux";
import { loginData } from "../../../redux/slices/loginUserReducer";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onEmailChange = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onPasswordChange = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onSubmit = (event) => {
        event.preventDefault(); // page refresh 방지
        const body = {
            email,
            password,
        };
        dispatch(loginData(body)).then(({ payload }) => {
            if (payload.loginSuccess) {
                navigate("/");
            }
        });
    };

    return (
        <Box>
            <Form onSubmit={onSubmit}>
                <label>Email</label>
                <input type="email" value={email} onChange={onEmailChange} />
                <label>Password</label>
                <input type="password" value={password} onChange={onPasswordChange} />
                <br />
                <button>Login</button>
            </Form>
        </Box>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export default LoginPage;
