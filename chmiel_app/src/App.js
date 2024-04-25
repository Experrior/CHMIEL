import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HomePage} from "./pages/Home/HomePage";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {RegisterPage} from "./pages/Authentication/RegisterPage";
import {ProtectedRoute} from "./other/ProtectedRoute";
import {LoginPage} from "./pages/Authentication/LoginPage";
import {ProfilePage} from "./pages/Profile/ProfilePage";
import { Board } from './pages/Board/Board';

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
        },
        {
            path: "/board",
            element: <ProtectedRoute><Board/></ProtectedRoute>,
        },
        // {
        //     path: "/backlog",
        //     element: <ProtectedRoute><Backlog/></ProtectedRoute>,
        // },
        // {
        //     path: "/issues",
        //     element: <ProtectedRoute><Issues/></ProtectedRoute>,
        // }
    ]);

    return (
        <RouterProvider router={router}/>
    );
}

export default App;
