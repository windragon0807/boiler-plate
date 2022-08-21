import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { Box } from "../../../styles/common/layout";

const LandingPage = () => {
    useEffect(() => {
        axios.get("/api/hello").then((response) => console.log(response.data));
    });

    return (
        <Box>
            <h2>시작 페이지</h2>
        </Box>
    );
};

export default LandingPage;
