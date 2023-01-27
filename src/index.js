import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import {RouterProvider} from "react-router-dom";
import loggedRouter from "./routers/loggedRouter";
import unLoggedRouter from "./routers/unLoggedRouter";
import LoginContext from "./contexts/LoginContext";
function App(){
    const [isLogged, setIsLogged] = useState(!!localStorage.getItem('token'))
    return (
        <LoginContext.Provider value={{isLogged, setIsLogged}}>
            <RouterProvider router={isLogged ? loggedRouter : unLoggedRouter} />
        </LoginContext.Provider>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
