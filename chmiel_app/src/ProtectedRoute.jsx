import { Navigate } from "react-router-dom";
import {useCookies} from "react-cookie";

export const ProtectedRoute = ({ children }) => {
    const [cookies, setCookie] = useCookies(['token']);
    if (!cookies.token){
        return <Navigate to="/login"/>;
    }
    return children;
};