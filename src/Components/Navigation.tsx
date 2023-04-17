import { useEffect, useState } from "react";
import { Container, Nav, NavDropdown } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../context/authContext";
import { getUser } from "../services/UserService";

const Navigation = () => {

    const user = useAuthState();
    const authDispatch = useAuthDispatch();

    const [isAdmin, setIsAdmin] = useState(false);

    console.log(user.token);

    useEffect(() => {
        getDetailsUser();
    }, []); 

    const getDetailsUser = async () => {
        const res: any = await getUser(user.username);

        if (res.data.role === "Admin"){
            console.log("AdminNav")
            setIsAdmin(true);
        }
        console.log(isAdmin);
    }
    
    const logout = () => {
        authDispatch({
            type:"logout"
        })
    }

    return (
        <Navbar className="navbar-dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/user">AutoRegistro</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar"></Navbar.Toggle>
                <Navbar.Collapse id="navbar">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/user">Inicio</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        { user.isAuthenticated ? 
                        <>
                            <Nav.Link as={Link} to="/createReport">Agregar reporte</Nav.Link>
                            <Nav.Link as={Link} to="/search">Buscar reportes</Nav.Link>
                            {
                                isAdmin &&
                                <>
                                    <Nav.Link as={Link} to="/stats">Estadísticas</Nav.Link>
                                </>
                            }
                            <NavDropdown title={user.username} id="navbar-dropdown">
                                <NavDropdown.Item as={Link} to="/myReports">Mis reportes</NavDropdown.Item>
                                <NavDropdown.Divider></NavDropdown.Divider>
                                {
                                    isAdmin &&
                                    <>
                                        <NavDropdown.Item as={Link} to="/createError">Nuevo error</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/createSummary">Nuevo summary</NavDropdown.Item>
                                        <NavDropdown.Divider></NavDropdown.Divider>
                                    </>
                                }                                
                                <NavDropdown.Item onClick={logout}>Cerrar sesión</NavDropdown.Item>
                            </NavDropdown> 
                        </>                            
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