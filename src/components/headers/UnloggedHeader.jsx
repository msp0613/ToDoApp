import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router-dom";
import '../../App.css'
const UnloggedHeader = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Zadania</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <div style={{display: "flex", gap: "10px"}}>
                            <NavLink className="header-link" to="/">Strona głowna</NavLink>
                            <NavLink className="header-link" to="/signup">Zarejestruj się</NavLink>
                            <NavLink className="header-link" to="/signin">Zaloguj</NavLink>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default UnloggedHeader;