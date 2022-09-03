import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import useRedirect from "hooks/useRedirect";
import { signInAndAuth } from "redux/slices/userReducer";
import { Box } from "styles/common/layout";
import { AwesomeText, FlexForm, ExtendButton, ErrorText } from "styles/common/component";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useRedirect("/");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onValid = (data) => {
        console.log("✔️", data);
        dispatch(signInAndAuth(data)).then((payload) => {
            if (payload) {
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
                {/* 🧩 이메일 */}
                <Form.Group className="mb-3">
                    <Form.Label>이메일</Form.Label>
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
                {/* 🧩 비밀번호 */}
                <Form.Group className="mb-4">
                    <Form.Label>비밀번호</Form.Label>
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
                {/* 🧩 버튼 */}
                <ExtendButton type="submit" className="mb-3">
                    로그인
                </ExtendButton>
                <Link to={"/register"}>
                    <ExtendButton variant="success" className="mb-3">
                        회원가입
                    </ExtendButton>
                </Link>
                <Link to={"/"}>
                    <ExtendButton variant="secondary">홈</ExtendButton>
                </Link>
            </FlexForm>
        </Box>
    );
};

export default LoginPage;
