import { useState } from "react";
import styled from "styled-components";
import { Box } from "../../../styles/common/layout";
import { useDispatch } from "react-redux";
import { setLoginUser } from "../../../redux/slices/loginUserReducer";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

        dispatch(setLoginUser(body));
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
