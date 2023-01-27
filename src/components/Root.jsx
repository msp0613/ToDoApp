import {Outlet} from "react-router-dom";
import LoggedHeader from "./headers/LoggedHeader";
import UnloggedHeader from "./headers/UnloggedHeader";
import {useContext} from "react";
import LoginContext from "../contexts/LoginContext";
const Root = () => {
    const loginContext = useContext(LoginContext);

    return (
        <>
            {loginContext.isLogged ? <LoggedHeader /> :<UnloggedHeader />}
            <Outlet />
        </>
    )
}

export default Root;