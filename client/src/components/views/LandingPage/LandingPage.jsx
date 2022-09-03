import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { logoutAndAuth } from "redux/slices/userReducer";
import { Box } from "styles/common/layout";
import { AwesomeText } from "styles/common/component";

const LandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuth, name } = useSelector((state) => state.user);

    const handleLogout = () => {
        if (isAuth) {
            handleClose();
            dispatch(logoutAndAuth()).then((payload) => {
                if (payload) {
                    navigate("/");
                }
            });
        }
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get("/api/hello").then((response) => console.log(response.data));
    }, []);

    useEffect(() => {
        console.log(`🔍 Login State :: [ ${isAuth} ]`);
    }, [isAuth]);

    return (
        <Box>
            {/* 🧩 로그인 상태일 때, */}
            {isAuth && (
                <>
                    <AwesomeText className="mb-4">{name}님 안녕하세요!</AwesomeText>
                    <Button onClick={handleShow} variant="danger" className="mb-4">
                        로그아웃
                    </Button>
                </>
            )}
            {/* 🧩 로그아웃 상태일 때, */}
            {!isAuth && (
                <>
                    <AwesomeText className="mb-4">로그인을 해주세요.</AwesomeText>
                    <Link to={"/login"}>
                        <Button className="mb-4">로그인</Button>
                    </Link>
                    <Link to={"/register"}>
                        <Button variant="success">회원가입</Button>
                    </Link>
                </>
            )}
            {/* 🧩 Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>로그아웃</Modal.Title>
                </Modal.Header>
                <Modal.Body>정말 로그아웃 하시겠습니까?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleLogout}>
                        네
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        아니오
                    </Button>
                </Modal.Footer>
            </Modal>
        </Box>
    );
};

export default LandingPage;
