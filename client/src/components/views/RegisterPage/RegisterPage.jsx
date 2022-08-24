import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Box } from "../../../styles/common/layout";
import { registerData } from "../../../redux/slices/registerReducer";
import { AwesomeText, FlexForm, ExtendButton, ErrorText } from "./../../../styles/common/component";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onValid = (data) => {
        console.log("✔️", data);
        if (data.password !== data.confirm) {
            setError("confirm", { message: "Password are not the same." }, { shouldFocus: true });
        } else {
            dispatch(registerData(data)).then(({ payload }) => {
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
            <AwesomeText className="mb-5">회원가입</AwesomeText>
            <FlexForm onSubmit={handleSubmit(onValid, onError)}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        {...register("name", {
                            required: "Name is required",
                        })}
                        placeholder="정승룡"
                    />
                    <ErrorText className="mt-2">{errors?.name?.message}</ErrorText>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "Correct your email format.",
                            },
                        })}
                        placeholder="tmdfyd95@naver.com"
                    />
                    <ErrorText className="mt-2">{errors?.email?.message}</ErrorText>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
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
                    <ErrorText className="mt-2">{errors?.password?.message}</ErrorText>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>Password Confirm</Form.Label>
                    <Form.Control
                        type="password"
                        {...register("confirm", {
                            required: "Password Confirm is required",
                            minLength: {
                                value: 5,
                                message: "Your password is too short.",
                            },
                        })}
                        placeholder="Password Confirm"
                    />
                    <ErrorText className="mt-2">{errors?.confirm?.message}</ErrorText>
                </Form.Group>
                <ExtendButton type="submit" variant="success" className="mb-3">
                    Register
                </ExtendButton>
                <Link to={"/login"}>
                    <ExtendButton className="mb-3">Login</ExtendButton>
                </Link>
                <Link to={"/"}>
                    <ExtendButton variant="secondary">Home</ExtendButton>
                </Link>
            </FlexForm>
        </Box>
    );
};

export default RegisterPage;
