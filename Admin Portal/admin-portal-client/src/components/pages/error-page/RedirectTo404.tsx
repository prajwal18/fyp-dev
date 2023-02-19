import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RedirectTo404 = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.pathname === '/admin/') {
            navigate('/admin/manage-student');
        } else {
            navigate('/404');
        }
    }, [location.pathname, navigate]);
    return (<></>);
}

export default RedirectTo404;