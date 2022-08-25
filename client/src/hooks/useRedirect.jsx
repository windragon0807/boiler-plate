import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * 로그인 상태에서 로그인 이후 접근권한이 없는 페이지에 접근할 때, 리다이렉팅 해주는 Hook
 */
const useRedirect = (path) => {
    const navigate = useNavigate();
    const { isAuth } = useSelector((state) => state.user);
    useEffect(() => {
        console.log(isAuth);
        if (isAuth) {
            navigate(path);
        }
    }, []);
};

export default useRedirect;
