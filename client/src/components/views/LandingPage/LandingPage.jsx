import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Box } from "../../../styles/common/layout";

const LandingPage = () => {
    useEffect(() => {
        axios.get("/api/hello").then((response) => console.log(response.data));
    }, []);

    return (
        <Box>
            <Link to={"/login"}>
                <Button className="mb-4">Login</Button>
            </Link>
            <Link to={"/register"}>
                <Button variant="success">Register</Button>
            </Link>
        </Box>
    );
};

export default LandingPage;
