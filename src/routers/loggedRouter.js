import {createBrowserRouter, Navigate} from "react-router-dom";

import HomePage from "../components/HomePage";
import Root from "../components/Root";
import CreateTask from "../components/CreateTask";
import Single from "../components/Single";

const loggedRouter = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "todo/:id",
                element: <Single />
            },
            {
                path: "create",
                element: <CreateTask />
            },
            {
                path: "*",
                element: <Navigate to="/" />
            }
        ]
    }
])

export default loggedRouter;