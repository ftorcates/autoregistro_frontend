import { Container, Nav, NavDropdown } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../context/authContext";

const Navigation = () => {

    const user = useAuthState();
    const authDispatch = useAuthDispatch();

    const logout = () => {
        authDispatch({
            type:"logout"
        })
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Encuesta</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar"></Navbar.Toggle>
                <Navbar.Collapse id="navbar">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        { user.isAuthenticated ? 
                            <NavDropdown title={user.email} id="navbar-dropdown">
                                <NavDropdown.Item as={Link} to="/user">Mis encuentas</NavDropdown.Item>
                                <NavDropdown.Divider></NavDropdown.Divider>
                                <NavDropdown.Item onClick={logout}>Cerrar sesión</NavDropdown.Item>
                            </NavDropdown> 
                        : 
                            <>
                                <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
                                <Nav.Link as={Link} to="/register">Crear cuenta</Nav.Link>
                            </>
                        }
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;