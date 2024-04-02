import { Navigate } from "react-router-dom";
import {useCookies} from "react-cookie";

export const ProtectedRoute = ({ children }) => {
    const [cookies, setCookie] = useCookies(['token']);
    console.log(cookies.token)
    if (!cookies.token){
        return <Navigate to="/login"/>;
    }
    return children;
};