import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HomePage} from "./pages/Home/HomePage";
import {createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom";
import {RegisterPage} from "./pages/Authentication/RegisterPage";
import {ProtectedRoute} from "./other/ProtectedRoute";
import {LoginPage} from "./pages/Authentication/LoginPage";
import {ProfilePage} from "./pages/Profile/ProfilePage";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <ProtectedRoute><HomePage/></ProtectedRoute>,
        },
        {
            path: "/register",
            element: <RegisterPage/>,
        },
        {
            path: "/login",
            element: <LoginPage/>,
        },
        {
            path: "/profile",
            element: <ProtectedRoute><ProfilePage/></ProtectedRoute>,
        }
    ]);

    return (
        <RouterProvider router={router}/>
    );
}

export default App;
