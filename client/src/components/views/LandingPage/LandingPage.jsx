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
        console.log(`π Login State :: [ ${isAuth} ]`);
    }, [isAuth]);

    return (
        <Box>
            {/* π§© λ‘κ·ΈμΈ μνμΌ λ, */}
            {isAuth && (
                <>
                    <AwesomeText className="mb-4">{name}λ μλνμΈμ!</AwesomeText>
                    <Button onClick={handleShow} variant="danger" className="mb-4">
                        λ‘κ·Έμμ
                    </Button>
                </>
            )}
            {/* π§© λ‘κ·Έμμ μνμΌ λ, */}
            {!isAuth && (
                <>
                    <AwesomeText className="mb-4">λ‘κ·ΈμΈμ ν΄μ£ΌμΈμ.</AwesomeText>
                    <Link to={"/login"}>
                        <Button className="mb-4">λ‘κ·ΈμΈ</Button>
                    </Link>
                    <Link to={"/register"}>
                        <Button variant="success">νμκ°μ</Button>
                    </Link>
                </>
            )}
            {/* π§© Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>λ‘κ·Έμμ</Modal.Title>
                </Modal.Header>
                <Modal.Body>μ λ§ λ‘κ·Έμμ νμκ² μ΅λκΉ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleLogout}>
                        λ€
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        μλμ€
                    </Button>
                </Modal.Footer>
            </Modal>
        </Box>
    );
};

export default LandingPage;
