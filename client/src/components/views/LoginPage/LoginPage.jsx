import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { loginData } from "../../../redux/slices/loginReducer";
import { Box } from "../../../styles/common/layout";
import { AwesomeText, FlexForm, ExtendButton, ErrorText } from "./../../../styles/common/component";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onValid = (data) => {
        console.log("✔️", data);
        dispatch(loginData(data)).then(({ payload }) => {
            if (payload.loginSuccess) {
                navigate("/");
            }
        });
    };

    const onError = (error) => {
        console.log("⚠️", error);
    };

    return (
        <Box>
            <AwesomeText className="mb-5">로그인</AwesomeText>
            <FlexForm onSubmit={handleSubmit(onValid, onError)}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        className="mb-2"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "Correct your email format.",
                            },
                        })}
                        placeholder="Email"
                    />
                    <ErrorText>{errors?.email?.message}</ErrorText>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        className="mb-2"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 5,
                                message: "Your password is too short.",
                            },
                        })}
                        placeholder="Password"
                    />
                    <ErrorText>{errors?.password?.message}</ErrorText>
                </Form.Group>
                <ExtendButton type="submit" className="mb-3">
                    Login
                </ExtendButton>
                <Link to={"/register"}>
                    <ExtendButton variant="success" className="mb-3">
                        Register
                    </ExtendButton>
                </Link>
                <Link to={"/"}>
                    <ExtendButton variant="secondary">Home</ExtendButton>
                </Link>
            </FlexForm>
        </Box>
    );
};

export default LoginPage;
