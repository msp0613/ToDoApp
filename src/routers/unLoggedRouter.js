import {createBrowserRouter, Navigate} from "react-router-dom";

import Signup from "../components/Signup";
import Signin from "../components/Signin";
import HomePage from "../components/HomePage";
import Root from "../components/Root";

const unLoggedRouter = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "signin",
                element: <Signin />
            },
            {
                path: "signup",
                element: <Signup />
            },
            {
                path: "*",
                element: <Navigate to="/" />
            }
        ]
    }
])

export default unLoggedRouter;