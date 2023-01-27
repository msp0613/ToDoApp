import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import axios from "axios";
import {useContext} from "react";
import LoginContext from "../../contexts/LoginContext";
import {NavLink, useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import '../../App.css'

const LoggedHeaders = () => {
    const navigate = useNavigate();
    const loginContext = useContext(LoginContext);
    const logout = () => {
        let formData = new FormData();
        formData.append('token', localStorage.getItem('token'))

        axios({
            method: 'post',
            url: 'http://localhost/php-react/logout.php/',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(function (response) {
                console.log(response)
                loginContext.setIsLogged(false);
                localStorage.removeItem('token');
                alert('User logout suceffuly!');
                setTimeout(() => {
                    navigate('/signin')
                }, 500)

            })
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Zadania</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                        <div style={{display: "flex", width: "100%", alignItems: "center", "justifyContent": "space-between"}}>
                            <div>
                                <NavLink className="header-link" to="/">Strona głowna</NavLink>
                                <NavLink className="header-link" to="/create">Stwórz zadanie</NavLink>
                            </div>
                            <Button variant="danger" onClick={logout}>Wyloguj</Button>
                        </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default LoggedHeaders;