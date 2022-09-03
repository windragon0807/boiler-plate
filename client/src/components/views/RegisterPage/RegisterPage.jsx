import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Box } from "styles/common/layout";
import useRedirect from "hooks/useRedirect";
import { signUp } from "redux/slices/userReducer";
import { AwesomeText, FlexForm, ExtendButton, ErrorText } from "styles/common/component";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useRedirect("/");
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onValid = (data) => {
        console.log("✔️ Sign Up Input Data\n\n", data);
        if (data.password !== data.confirm) {
            setError("confirm", { message: "비밀번호가 서로 다릅니다." }, { shouldFocus: true });
        } else {
            dispatch(signUp(data)).then(({ payload }) => {
                if (payload.success) {
                    navigate("/login");
                }
            });
        }
    };

    const onError = (error) => {
        console.log("⚠️", error);
    };

    return (
        <Box>
            <AwesomeText className="mb-4">회원가입</AwesomeText>
            <FlexForm onSubmit={handleSubmit(onValid, onError)}>
                {/* 🧩 이름 */}
                <Form.Group className="mb-2">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                        {...register("name", {
                            required: "이름을 입력해주세요.",
                        })}
                        placeholder="정승룡"
                    />
                    <ErrorText className="mt-2">{errors?.name?.message}</ErrorText>
                </Form.Group>
                {/* 🧩 이메일 */}
                <Form.Group className="mb-2">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                        type="email"
                        {...register("email", {
                            required: "이메일을 입력해주세요",
                            pattern: {
                                value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "올바른 이메일 형식이 필요합니다.",
                            },
                        })}
                        placeholder="tmdfyd95@naver.com"
                    />
                    <ErrorText className="mt-2">{errors?.email?.message}</ErrorText>
                </Form.Group>
                {/* 🧩 비밀번호 */}
                <Form.Group className="mb-2">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        {...register("password", {
                            required: "비밀번호를 입력해주세요.",
                            minLength: {
                                value: 5,
                                message: "비밀번호가 너무 짧습니다.",
                            },
                        })}
                        placeholder="Password"
                    />
                    <ErrorText className="mt-2">{errors?.password?.message}</ErrorText>
                </Form.Group>
                {/* 🧩 비밀번호 확인 */}
                <Form.Group className="mb-3">
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control
                        type="password"
                        {...register("confirm", {
                            required: "비밀번호를 확인해주세요.",
                            minLength: {
                                value: 5,
                                message: "비밀번호가 너무 짧습니다.",
                            },
                        })}
                        placeholder="Password Confirm"
                    />
                    <ErrorText className="mt-2">{errors?.confirm?.message}</ErrorText>
                </Form.Group>
                {/* 🧩 버튼 */}
                <ExtendButton type="submit" variant="success" className="mb-3">
                    등록하기
                </ExtendButton>
                <Link to={"/login"}>
                    <ExtendButton className="mb-3">로그인</ExtendButton>
                </Link>
                <Link to={"/"}>
                    <ExtendButton variant="secondary">홈</ExtendButton>
                </Link>
            </FlexForm>
        </Box>
    );
};

export default RegisterPage;
