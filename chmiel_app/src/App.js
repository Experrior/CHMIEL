import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HomePage} from "./pages/HomePage";
import {createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom";
import {RegisterPage} from "./pages/RegisterPage";
import {ProtectedRoute} from "./other/ProtectedRoute";
import {LoginPage} from "./pages/LoginPage";

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
        }
    ]);

    return (
        <RouterProvider router={router}/>
    );
}

export default App;
